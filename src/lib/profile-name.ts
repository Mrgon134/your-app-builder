import type { User } from "@supabase/supabase-js";

type ProfileLike = {
  display_name?: string | null;
};

const cleanName = (value?: string | null) => {
  if (!value) return null;
  const normalized = value.replace(/\s+/g, " ").trim();
  return normalized ? normalized.slice(0, 48) : null;
};

export const resolveDisplayName = (
  profile?: ProfileLike | null,
  user?: Pick<User, "user_metadata"> | null,
) => {
  const metadata = user?.user_metadata as Record<string, unknown> | undefined;

  return (
    cleanName(profile?.display_name) ||
    cleanName(typeof metadata?.display_name === "string" ? metadata.display_name : null) ||
    cleanName(typeof metadata?.full_name === "string" ? metadata.full_name : null) ||
    cleanName(typeof metadata?.name === "string" ? metadata.name : null) ||
    null
  );
};

export const getFirstName = (displayName?: string | null) => {
  const normalized = cleanName(displayName);
  if (!normalized) return null;

  return normalized.split(" ")[0] || null;
};
