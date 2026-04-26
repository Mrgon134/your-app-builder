import { supabase, SUPABASE_ANON_KEY } from "@/integrations/supabase/client";

export const getFunctionAccessToken = async () => {
  const { data } = await supabase.auth.getSession();
  return data.session?.access_token || SUPABASE_ANON_KEY;
};

export const getJsonFunctionHeaders = async () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${await getFunctionAccessToken()}`,
});
