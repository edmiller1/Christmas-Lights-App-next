import { TypedSupabaseClient } from "@/lib/types";

export const getUserNotifications = (
  client: TypedSupabaseClient,
  userId: string
) => {
  return client
    .from("notification")
    .select("*")
    .eq("profile_id", userId)
    .order("created_at", { ascending: false });
};
