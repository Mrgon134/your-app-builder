import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resvg, initWasm } from "https://esm.sh/@resvg/resvg-wasm@2.6.0";

// Initialize WASM once at cold start
const wasmResponse = await fetch("https://esm.sh/@resvg/resvg-wasm@2.6.0/index_bg.wasm");
await initWasm(wasmResponse);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function buildSVG(title = "Nuju", subtitle = "The 30-second AI journal that understands your life.") {
  return `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="1200" height="630" fill="#13111C"/>

  <!-- Dot grid -->
  <defs>
    <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
      <circle cx="1" cy="1" r="1" fill="#7C6EDB" opacity="0.12"/>
    </pattern>
    <radialGradient id="glowTop" cx="50%" cy="0%" r="60%">
      <stop offset="0%" stop-color="#7C6EDB" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="#7C6EDB" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glowLeft" cx="0%" cy="100%" r="50%">
      <stop offset="0%" stop-color="#4ECDC4" stop-opacity="0.10"/>
      <stop offset="100%" stop-color="#4ECDC4" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- Dot grid overlay -->
  <rect width="1200" height="630" fill="url(#dots)"/>

  <!-- Glows -->
  <ellipse cx="600" cy="-60" rx="500" ry="340" fill="url(#glowTop)"/>
  <ellipse cx="-40" cy="680" rx="320" ry="280" fill="url(#glowLeft)"/>

  <!-- Icon box -->
  <rect x="552" y="60" width="96" height="96" rx="28" fill="#7C6EDB" fill-opacity="0.12" stroke="#7C6EDB" stroke-opacity="0.3" stroke-width="1.5"/>
  <!-- Ju wordmark mark -->
  <text x="600" y="130" font-family="Georgia, serif" font-size="52" font-weight="bold" fill="#7C6EDB" text-anchor="middle">Ju</text>

  <!-- App name -->
  <text x="600" y="240" font-family="Georgia, serif" font-size="84" font-weight="bold" fill="#E8E4F8" text-anchor="middle" letter-spacing="-2">${title}</text>

  <!-- Tagline -->
  <text x="600" y="295" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="26" fill="#9B93C0" text-anchor="middle">${subtitle}</text>

  <!-- Pill: Mood Tracking -->
  <rect x="220" y="355" width="208" height="44" rx="22" fill="#7C6EDB" fill-opacity="0.10" stroke="#7C6EDB" stroke-opacity="0.28" stroke-width="1.2"/>
  <text x="324" y="383" font-family="-apple-system, sans-serif" font-size="18" font-weight="500" fill="#B8B0E8" text-anchor="middle">♡  Mood Tracking</text>

  <!-- Pill: AI Coach -->
  <rect x="496" y="355" width="208" height="44" rx="22" fill="#4ECDC4" fill-opacity="0.08" stroke="#4ECDC4" stroke-opacity="0.25" stroke-width="1.2"/>
  <text x="600" y="383" font-family="-apple-system, sans-serif" font-size="18" font-weight="500" fill="#4ECDC4" text-anchor="middle">✦  AI Coach</text>

  <!-- Pill: Voice Journal -->
  <rect x="772" y="355" width="208" height="44" rx="22" fill="#FFB347" fill-opacity="0.08" stroke="#FFB347" stroke-opacity="0.25" stroke-width="1.2"/>
  <text x="876" y="383" font-family="-apple-system, sans-serif" font-size="18" font-weight="500" fill="#FFB347" text-anchor="middle">♪  Voice Journal</text>

  <!-- Domain -->
  <text x="600" y="570" font-family="-apple-system, sans-serif" font-size="20" fill="#7C6EDB" fill-opacity="0.55" text-anchor="middle" letter-spacing="0.5">nuju.app</text>

  <!-- Outer border -->
  <rect x="0.5" y="0.5" width="1199" height="629" fill="none" stroke="#7C6EDB" stroke-opacity="0.08" stroke-width="1"/>
</svg>`.trim();
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const title = url.searchParams.get("title") || "Nuju";
    const subtitle = url.searchParams.get("subtitle") || "The 30-second AI journal that understands your life.";

    const svg = buildSVG(title, subtitle);
    const resvg = new Resvg(svg, {
      fitTo: { mode: "width", value: 1200 },
    });
    const pngData = resvg.render();
    const png = pngData.asPng();

    return new Response(png, {
      headers: {
        ...corsHeaders,
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=604800, s-maxage=604800, immutable",
      },
    });
  } catch (e) {
    console.error("OG image error:", e);
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
