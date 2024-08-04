import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SignupCard } from "./components/SignupCard";

export default function Signup({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signUp = async (
    firstname: string,
    lastname: string,
    email: string,
    password: string
  ) => {
    "use server";

    const origin = headers().get("origin");
    const supabase = createClient();

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          full_name: firstname + " " + lastname,
        },
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      return { error: error.message, success: false };
    }
    if (data.user?.identities?.length === 0) {
      return {
        error: "Account with that email already exists",
        success: false,
      };
    }

    return { error: undefined, success: true };
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

  return (
    <div className="min-h-screen flex justify-center items-center">
      <SignupCard signUp={signUp} signInWithGoogle={signInWithGoogle} />
    </div>
  );
}
