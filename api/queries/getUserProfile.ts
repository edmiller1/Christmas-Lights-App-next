import { TypedSupabaseClient } from "@/lib/types";

export const getUserProfile = (client: TypedSupabaseClient, userId: string) => {
  return client
    .from("profile")
    .select("*")
    .eq("id", userId)
    .throwOnError()
    .single();
};
