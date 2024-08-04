import { createClient } from "@/utils/supabase/server";
import { ResetPasswordForm } from "./components/ResetPasswordForm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default function ResetPassword() {
  const resetPassword = async (email: string) => {
    "use server";

    const origin = headers().get("origin");
    const supabase = createClient();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${origin}/update-password`,
    });

    if (error) {
      return { error: error.message };
    }

    return redirect("/login");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <ResetPasswordForm resetPassword={resetPassword} />
    </div>
  );
}
