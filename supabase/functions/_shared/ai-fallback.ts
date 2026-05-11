export type ChatRole = "system" | "user" | "assistant";

export type ChatMessage = {
  role: ChatRole;
  content: string;
};

type ResponseFormat = { type: "json_object" };

type ChatOptions = {
  messages: ChatMessage[];
  maxTokens: number;
  temperature: number;
  responseFormat?: ResponseFormat;
  label?: string;
};

type ProviderConfig = {
  apiKey: string;
  baseUrl: string;
  model: string;
  name: "groq" | "openrouter";
};

class AIProviderError extends Error {
  constructor(
    message: string,
    readonly provider: string,
    readonly status?: number,
  ) {
    super(message);
    this.name = "AIProviderError";
  }
}

const encoder = new TextEncoder();

const groqConfig = (): ProviderConfig | null => {
  const apiKey = Deno.env.get("GROQ_API_KEY") || Deno.env.get("AI_API_KEY") || "";
  if (!apiKey) return null;

  return {
    apiKey,
    baseUrl: "https://api.groq.com/openai/v1",
    model: Deno.env.get("GROQ_TEXT_MODEL") || Deno.env.get("AI_MODEL") || "llama-3.3-70b-versatile",
    name: "groq",
  };
};

const openRouterConfig = (): ProviderConfig | null => {
  const apiKey = Deno.env.get("OPENROUTER_API_KEY") || Deno.env.get("AI_FALLBACK_API_KEY") || "";
  if (!apiKey) return null;

  return {
    apiKey,
    baseUrl: Deno.env.get("OPENROUTER_BASE_URL") || "https://openrouter.ai/api/v1",
    model: Deno.env.get("OPENROUTER_TEXT_MODEL") || Deno.env.get("AI_FALLBACK_MODEL") || "openai/gpt-oss-120b",
    name: "openrouter",
  };
};

const headersFor = (config: ProviderConfig): HeadersInit => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${config.apiKey}`,
  };

  if (config.name === "openrouter") {
    headers["HTTP-Referer"] = Deno.env.get("OPENROUTER_APP_URL") || "https://nuju.app";
    headers["X-Title"] = Deno.env.get("OPENROUTER_APP_TITLE") || "Nuju";
  }

  return headers;
};

const requestBody = (config: ProviderConfig, options: ChatOptions, stream: boolean) => {
  const body: Record<string, unknown> = {
    model: config.model,
    messages: options.messages,
    max_tokens: options.maxTokens,
    temperature: options.temperature,
  };

  if (stream) body.stream = true;
  if (options.responseFormat) body.response_format = options.responseFormat;

  return body;
};

const shouldFallback = (error: unknown): boolean => {
  if (error instanceof AIProviderError) {
    if (error.status === undefined) return true;
    return [401, 403, 408, 409, 429, 498, 500, 502, 503, 504].includes(error.status);
  }

  return error instanceof TypeError;
};

const fallbackMessage = (label: string | undefined, error: unknown) => {
  const prefix = label ? `[${label}]` : "[ai]";
  const detail = error instanceof Error ? error.message : String(error);
  console.warn(`${prefix} Groq failed, falling back to OpenRouter: ${detail}`);
};

async function fetchChat(config: ProviderConfig, options: ChatOptions, stream: boolean): Promise<Response> {
  const res = await fetch(`${config.baseUrl}/chat/completions`, {
    method: "POST",
    headers: headersFor(config),
    body: JSON.stringify(requestBody(config, options, stream)),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new AIProviderError(`${config.name} ${res.status}: ${text}`, config.name, res.status);
  }

  return res;
}

const providerOrder = () => {
  const primary = groqConfig();
  const fallback = openRouterConfig();

  if (!primary && !fallback) {
    throw new Error("No AI key set. Add GROQ_API_KEY and OPENROUTER_API_KEY in Supabase secrets.");
  }

  return { primary, fallback };
};

export async function callChatWithGroqFallback(options: ChatOptions): Promise<string> {
  const { primary, fallback } = providerOrder();

  if (primary) {
    try {
      const res = await fetchChat(primary, options, false);
      const data = await res.json();
      return data.choices?.[0]?.message?.content || "";
    } catch (error) {
      if (!fallback || !shouldFallback(error)) throw error;
      fallbackMessage(options.label, error);
    }
  }

  if (!fallback) throw new Error("OpenRouter fallback key is not configured.");

  const res = await fetchChat(fallback, options, false);
  const data = await res.json();
  return data.choices?.[0]?.message?.content || "";
}

function sseChunk(text: string): Uint8Array {
  const chunk = JSON.stringify({ choices: [{ delta: { content: text } }] });
  return encoder.encode(`data: ${chunk}\n\n`);
}

const sseDone = encoder.encode("data: [DONE]\n\n");

async function streamFromResponse(res: Response): Promise<ReadableStream> {
  if (!res.body) throw new AIProviderError("Provider returned an empty stream", "unknown");

  const reader = res.body.getReader();
  const decoder = new TextDecoder();

  return new ReadableStream({
    async start(controller) {
      let buffer = "";
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          let nlIdx: number;
          while ((nlIdx = buffer.indexOf("\n")) !== -1) {
            const line = buffer.slice(0, nlIdx).replace(/\r$/, "");
            buffer = buffer.slice(nlIdx + 1);
            if (!line.startsWith("data: ")) continue;

            const jsonStr = line.slice(6).trim();
            if (!jsonStr || jsonStr === "[DONE]") continue;

            try {
              const data = JSON.parse(jsonStr);
              const text = data.choices?.[0]?.delta?.content;
              if (text) controller.enqueue(sseChunk(text));
            } catch {
              // Skip malformed provider chunks.
            }
          }
        }
      } finally {
        controller.enqueue(sseDone);
        controller.close();
      }
    },
  });
}

export async function streamChatWithGroqFallback(options: ChatOptions): Promise<ReadableStream> {
  const { primary, fallback } = providerOrder();

  if (primary) {
    try {
      const res = await fetchChat(primary, options, true);
      return streamFromResponse(res);
    } catch (error) {
      if (!fallback || !shouldFallback(error)) throw error;
      fallbackMessage(options.label, error);
    }
  }

  if (!fallback) throw new Error("OpenRouter fallback key is not configured.");

  const res = await fetchChat(fallback, options, true);
  return streamFromResponse(res);
}
