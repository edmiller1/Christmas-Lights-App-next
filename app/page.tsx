import { AppHeader } from "@/components/AppHeader";
import { createClient } from "@/utils/supabase/server";

export default async function Index() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="bg-background">
      <AppHeader user={user} />
    </div>
  );
}
