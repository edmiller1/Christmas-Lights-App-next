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
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CircleNotch } from "@phosphor-icons/react";
import { useState } from "react";
import Link from "next/link";

const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);

const formSchema = z.object({
  password: z.string().min(8),
  // .regex(passwordValidation, {
  //   message: "password is not valid",
  // }),
});

interface Props {
  updatePassword: (password: string) => Promise<{ error: string } | undefined>;
}

export const UpdatePasswordForm = ({ updatePassword }: Props) => {
  const [updateLoading, setUpdateLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setUpdateLoading(true);
    const result = await updatePassword(values.password);

    if (result) {
      toast.error(result.error);
    } else {
      toast.success("Password updated successfully");
    }
    setUpdateLoading(false);
  }

  return (
    <Card className="mx-auto w-[400px]">
      <CardHeader>
        <CardTitle className="text-2xl">Create new password</CardTitle>
        <CardDescription>Enter your new password below.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4">
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
              <Button type="submit" className="w-full">
                {updateLoading ? (
                  <CircleNotch
                    size={24}
                    weight="bold"
                    className="animate-spin"
                  />
                ) : (
                  "Update password"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
