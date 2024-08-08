import { TypedSupabaseClient } from "@/lib/types";

export const getUnreadNotificationsCount = (
  client: TypedSupabaseClient,
  userId: string
) => {
  return client
    .from("notification")
    .select("*", { count: "exact", head: true })
    .eq("profile_id", userId)
    .eq("unread", true);
};
