"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import NavBar from "@/app/components/NavBar";
import { useRouter } from "next/navigation";
import { auth } from "@/config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(5, { message: "Password must be at least 8 characters" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const user = auth?.currentUser;
  console.log("Current user: ", user);

  async function onSubmit(values: LoginFormValues) {
    console.log(values);

    if (user) {
      window.alert(
        "You are already logged in. Please log out to register a new account."
      );
      router.push("/");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user = userCredential.user;
      console.log("Logged in user:", user);
      router.push("/");
      window.alert("Signed up successfully");
    } catch (error) {
      let message = "Server error occurred. Try again!";
      if (typeof error === "object" && error !== null && "code" in error) {
        const errorCode = (error as { code: string }).code;
        if (errorCode === "auth/email-already-in-use") {
          message = "This email is already registered. Please use another email.";
        } else if (errorCode === "auth/weak-password") {
          message = "Password is too weak. Please use at least 6 characters.";
        } else if (errorCode === "auth/invalid-email") {
          message = "Invalid email address.";
        } else if ("message" in error) {
          message = (error as { message: string }).message;
        }
      } else if (typeof error === "object" && error !== null && "message" in error) {
        message = (error as { message: string }).message;
      }
      window.alert(message);
      console.error("Register error:  ", error);
    }
  }

  return (
    <div className="flex flex-col">
      <div className="w-4/6 mx-auto">
        <NavBar />
      </div>
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="example@email.com"
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full hover:cursor-pointer">
                  Login
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link
              href="/register"
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Don&apos;t have an account? Sign up
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
