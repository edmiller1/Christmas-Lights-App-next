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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Cheers, CircleNotch } from "@phosphor-icons/react";
import { useState } from "react";
import Link from "next/link";

const formSchema = z.object({
  email: z.string().email({ message: "Must be a valid email" }),
});

interface Props {
  resetPassword: (email: string) => Promise<{ error: string } | undefined>;
}

export const ResetPasswordForm = ({ resetPassword }: Props) => {
  const [resetLoading, setResetLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setResetLoading(true);
    const result = await resetPassword(values.email);

    if (result) {
      toast.error(result.error);
    } else {
      setIsSuccess(true);
    }
    setResetLoading(false);
  }

  return (
    <>
      {!isSuccess && (
        <Alert className="w-[350px] mb-5">
          <Cheers size={20} weight="bold" />
          <AlertTitle>Password reset email sent!</AlertTitle>
          <AlertDescription>
            Check your email to finish resetting your password.
          </AlertDescription>
        </Alert>
      )}
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Forgot password?</CardTitle>
          <CardDescription>
            No worries! We'll send you reset instructions.
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
                <Button type="submit" className="w-full">
                  {resetLoading ? (
                    <CircleNotch
                      size={24}
                      weight="bold"
                      className="animate-spin"
                    />
                  ) : (
                    "Reset password"
                  )}
                </Button>
              </div>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            &larr;{" "}
            <Link href="/login" className="underline">
              Back to login
            </Link>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
