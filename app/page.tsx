import { getUserProfile } from "@/api/queries/getUserProfile";
import { AppHeader } from "@/components/AppHeader";
import { Home } from "@/components/Home";
import useSupabaseServer from "@/utils/supabase/server";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { prefetchQuery } from "@supabase-cache-helpers/postgrest-react-query";
import { cookies } from "next/headers";

export default async function Index() {
  const queryClient = new QueryClient();
  const cookieStore = cookies();
  const supabase = useSupabaseServer(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    await prefetchQuery(queryClient, getUserProfile(supabase, user.id));
  }

  return (
    <div className="bg-background">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <AppHeader user={user} />
      </HydrationBoundary>
      <Home />
    </div>
  );
}
