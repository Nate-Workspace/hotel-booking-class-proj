"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import NavBar from "@/app/components/NavBar"
import { useRouter } from "next/navigation"

const signupSchema = z
  .object({
    username: z.string().min(3, { message: "Username must be at least 3 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

type SignupFormValues = z.infer<typeof signupSchema>

export default function RegisterPage() {
  const router= useRouter();
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  async function onSubmit(values: SignupFormValues) {
    console.log(values)
    try {
      const response= await fetch("https://hotelproject-ewqi.onrender.com/api/register/", {
        method: "POST",
        headers:{
          "Content-Type": "application/json"
        },
        body:JSON.stringify(values)
      })

      if(!response.ok){
        console.log("Invalid data. Please try again")
        window.alert("Invalid data. Please try again")
      }

      if(response.ok){
        const data= await response.json();
        localStorage.setItem("user_id", data.id);
        localStorage.setItem("user_email", data.email);
        localStorage.setItem("username", data.username);
  
        console.log(data)
        router.push("/")
        window.alert("Signed up successfully")
      }
    } catch (error) {
      window.alert("Server error occurred. Try again!" )
      console.error(error)
    }
  }

  return (
    <div className="flex flex-col">
      <div className="w-4/6 mx-auto">
      <NavBar/>
      </div>
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Create an account to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="johndoe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="example@email.com" type="email" {...field} />
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
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href="/login" className="text-sm text-blue-600 hover:text-blue-800">
            Already have an account? Login
          </Link>
        </CardFooter>
      </Card>
    </div>
    </div>
  )
}



// {
//   "username": "Nate-User",    
//   "email":    "user@gmail.com",
//   "password": "pass123",
//   "password2":"pass123"
// }

// {
//     "id": 4,
//     "username": "Nate-User",
//     "email": "user@gmail.com",
//     "is_admin": false,
//     "phone": null
// }