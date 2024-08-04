"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { useState } from "react";
import { CircleNotch } from "@phosphor-icons/react";

const formSchema = z.object({
  email: z.string().email({ message: "Must be a valid email" }),
  password: z.string().min(8),
});

interface Props {
  signIn: (email: string, password: string) => Promise<{ error: string }>;
  signInWithGoogle: () => Promise<{ error: string | undefined }>;
}

export const LoginCard = ({ signIn, signInWithGoogle }: Props) => {
  const [signInLoading, setSignInLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setSignInLoading(true);
    const result = await signIn(values.email, values.password);

    if (result) {
      toast.error(result.error);
    }
    setSignInLoading(false);
  }

  async function onSubmitWithGoogle() {
    const result = await signInWithGoogle();

    if (result) {
      toast.error(result.error);
    }
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          type="email"
                          placeholder="santa@northpole.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <FormControl>
                        <Input id="password" type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Link
                href="/reset-password"
                className="ml-auto inline-block text-sm underline"
              >
                Forgot your password?
              </Link>
              <Button type="submit" className="w-full">
                {signInLoading ? (
                  <CircleNotch
                    size={24}
                    weight="bold"
                    className="animate-spin"
                  />
                ) : (
                  "Login"
                )}
              </Button>
            </div>
          </form>
        </Form>
        <Button
          variant="outline"
          className="w-full mt-5"
          onClick={onSubmitWithGoogle}
        >
          Login with Google
        </Button>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
