import { createClient } from "@/utils/supabase/server";

export const getUserProfile = async (userId: string) => {
  const supabase = createClient();

  const { data } = await supabase
    .from("profile")
    .select("*")
    .eq("id", userId)
    .single();

  return data;
};
