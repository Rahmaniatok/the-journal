"use client";

import { useRouter } from "next/navigation";
import { useState } from "react"
import axios from "axios"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { ControllerRenderProps } from "react-hook-form";

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { Eye, EyeOff } from "lucide-react"
import { getProfile } from "@/lib/auth";

const schema = z.object({
  username: z.string().min(1, "Please enter your username"),
  password: z.string().min(1, "Please enter your password"),
})

type SignInForm = z.infer<typeof schema>;


export default function SignIn() {
  const router = useRouter(); // ⬅️ tambahkan ini
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  const onSubmit = async (values: SignInForm) => {
    try {
      setLoading(true);
      const response = await axios.post("https://test-fe.mysellerpintar.com/api/auth/login", {
        username: values.username,
        password: values.password,
      });

      const token = response.data.token;
      localStorage.setItem("token", token);
      localStorage.setItem("user_password", values.password);


      const profile = await getProfile(token);

      if (profile.role === "User") {
        router.push("/articles");
      } else if (profile.role === "Admin") {
        router.push("/admin-articles");
      } else {
        alert("Unknown role, cannot redirect.");
      }
 
 
      } catch (error) {
      console.error("Register/Login Error:", error);
      alert("Something went wrong");
      } finally {
      setLoading(false);
      }
 
  };
  return (
    <div className="bg-[#F3F4F6] h-screen items-center flex justify-center">
      <div className="bg-white w-full md:w-[400px] h-full md:h-fit rounded-xl flex flex-col justify-center gap-[24px] p-[16px]">
        <img src="logoipsum.png" className="object-none" />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }: { field: ControllerRenderProps<SignInForm, "username"> }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Input username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }: { field: ControllerRenderProps<SignInForm, "password"> }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Input password"
                        {...field}
                      />
                    </FormControl>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="bg-blue-600" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </Form>

        <div className="flex justify-center text-sm">
          <span>Don&apos;t have an account?&nbsp;</span>
          <a href="/register" className="underline text-blue-600 cursor-pointer">Register</a>
        </div>
      </div>
    </div>
  );
}
