import { getUserProfile } from "@/api/queries/getUserProfile";
import { AppHeader } from "@/components/AppHeader";
import { Database } from "@/database.types";
import { Profile } from "@/lib/types";
import { createClient } from "@/utils/supabase/server";

export default async function Index() {
  let profile: Profile | null = null;
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    profile = await getUserProfile(user.id);
    console.log(profile);
  }

  return (
    <div className="bg-background">
      <AppHeader user={user} profile={profile} />
    </div>
  );
}
