import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { UpdatePasswordForm } from "./components/UpdatePasswordForm";
import { redirect } from "next/navigation";

export default function UpdatePassword() {
  const updatePassword = async (password: string) => {
    "use server";

    const origin = headers().get("origin");
    const supabase = createClient();

    const { error } = await supabase.auth.updateUser({
      password: password,
      data: {
        options: {
          emailRedirectTo: `${origin}/auth/callback`,
        },
      },
    });

    if (error) {
      return { error: error.message };
    }

    return redirect("/login");
  };
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <UpdatePasswordForm updatePassword={updatePassword} />
    </div>
  );
}
