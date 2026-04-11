import type { User } from "@supabase/supabase-js";

import type { ProfileRow } from "@/lib/api";

const TEST_USER_ENABLED = import.meta.env.DEV && import.meta.env.VITE_ENABLE_TEST_USER === "true";
const TEST_USER_EMAIL = (import.meta.env.VITE_TEST_USER_EMAIL || "").trim().toLowerCase();
const TEST_USER_PASSWORD = import.meta.env.VITE_TEST_USER_PASSWORD || "";
const TEST_USER_NAME = (import.meta.env.VITE_TEST_USER_NAME || "Nuju Test User").trim();
const TEST_USER_PLAN = (import.meta.env.VITE_TEST_USER_PLAN || "lifetime").trim();

export const isTestUserEnabled = () => TEST_USER_ENABLED;

export const isTestUser = (userOrEmail: User | string | null | undefined) => {
  if (!TEST_USER_ENABLED) return false;
  const email =
    typeof userOrEmail === "string"
      ? userOrEmail
      : userOrEmail?.email;

  if (!TEST_USER_EMAIL) return Boolean(email);
  return (email || "").trim().toLowerCase() === TEST_USER_EMAIL;
};

export const getTestUserCredentials = () => ({
  enabled: TEST_USER_ENABLED && Boolean(TEST_USER_EMAIL && TEST_USER_PASSWORD),
  email: TEST_USER_EMAIL,
  password: TEST_USER_PASSWORD,
  name: TEST_USER_NAME,
});

export const applyTestUserProfile = (
  profile: ProfileRow | null,
  user: User | null,
): ProfileRow | null => {
  if (!user || !isTestUser(user)) return profile;

  return {
    id: profile?.id || user.id,
    display_name: profile?.display_name || TEST_USER_NAME,
    language: profile?.language || "en",
    plan: TEST_USER_PLAN,
    streak_current: profile?.streak_current || 0,
    streak_longest: profile?.streak_longest || 0,
    streak_last_date: profile?.streak_last_date || null,
    total_entries: profile?.total_entries || 0,
    coach_persona: profile?.coach_persona || "gentle",
    onboarded: true,
    trial_started_at: null,
  };
};
