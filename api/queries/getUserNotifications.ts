import { createClient } from "@/utils/supabase/client";

export const getUserNotifications = async (userId: string) => {
  "use client";
  const supabase = createClient();

  const { data } = await supabase
    .from("notification")
    .select("*")
    .eq("profile_id", userId)
    .order("created_at", { ascending: false });

  return data;
};
