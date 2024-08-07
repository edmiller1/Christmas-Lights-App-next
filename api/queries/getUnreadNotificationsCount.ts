import { createClient } from "@/utils/supabase/client";

export const getUserUnreadNotificationsCount = async (userId: string) => {
  "use client";
  const supabase = createClient();

  const { count } = await supabase
    .from("notification")
    .select("*", { count: "exact", head: true })
    .eq("profile_id", userId)
    .eq("unread", true);

  return count;
};
