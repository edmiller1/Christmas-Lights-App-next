import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { LoginCard } from "./components/LoginCard";

export default async function Login() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signIn = async (email: string, password: string) => {
    "use server";

    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      return { error: error.message };
    }

    return redirect("/");
  };

  const signInWithGoogle = async () => {
    "use server";

    const origin = headers().get("origin");
    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${origin}/auth/callback`,
      },
    });

    if (error || !data.url) {
      return { error: error?.message };
    }

    return redirect(data.url!);
  };

  if (user) {
    return redirect("/");
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <LoginCard signIn={signIn} signInWithGoogle={signInWithGoogle} />
    </div>
  );
}
