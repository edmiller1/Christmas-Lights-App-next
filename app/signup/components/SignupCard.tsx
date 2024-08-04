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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CircleNotch, RocketLaunch } from "@phosphor-icons/react/dist/ssr";

const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);

const formSchema = z.object({
  firstname: z.string().min(2),
  lastname: z.string().min(2),
  email: z.string().email({ message: "Must be a valid email" }),
  password: z.string().min(8),
  // .regex(passwordValidation, {
  //   message: "password is not valid",
  // }),
});

interface Props {
  signUp: (
    firstname: string,
    lastname: string,
    email: string,
    password: string
  ) => Promise<
    { error: string; success: boolean } | { error: undefined; success: boolean }
  >;
  signInWithGoogle: () => Promise<{ error: string | undefined }>;
}

export const SignupCard = ({ signUp, signInWithGoogle }: Props) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [signUpLoading, setSignUpLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setSignUpLoading(true);
    const result = await signUp(
      values.firstname,
      values.lastname,
      values.email,
      values.password
    );

    console.log(result);

    if (result.error && result.error.length > 0) {
      toast.error(result.error);
      setIsSuccess(false);
      setSignUpLoading(false);
    } else {
      setIsSuccess(true);
      setSignUpLoading(false);
    }
  }

  async function onSubmitWithGoogle() {
    const result = await signInWithGoogle();

    if (result) {
      toast.error(result.error);
    }
  }

  return (
    <div>
      {isSuccess && (
        <Alert className="w-full mb-5">
          <RocketLaunch size={20} weight="bold" />
          <AlertTitle>Account Created!</AlertTitle>
          <AlertDescription>
            Check your email to continue the sign up process.
          </AlertDescription>
        </Alert>
      )}
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-4">
                <div className="flex items-center space-x-5">
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="firstname"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="name">First name</FormLabel>
                          <Input
                            id="firstname"
                            type="text"
                            {...field}
                            required
                          />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="lastname"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="name">Last name</FormLabel>
                          <Input
                            id="lastname"
                            type="text"
                            {...field}
                            required
                          />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

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
                            required
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
                          <Input
                            id="password"
                            type="password"
                            {...field}
                            required
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit" className="w-full">
                  {signUpLoading ? (
                    <CircleNotch
                      size={24}
                      weight="bold"
                      className="animate-spin"
                    />
                  ) : (
                    "Sign up"
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
            Sign up with Google
          </Button>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
