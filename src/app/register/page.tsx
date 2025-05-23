'use client';

import { useRouter } from "next/navigation";
import { useState } from "react"
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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

import { Eye, EyeOff } from "lucide-react"

const schema = z.object({
  username: z.string().min(1, "Please enter your username"),
  password: z.string().min(1, "Please enter your password"),
  role: z.enum(["user", "admin"], {
    errorMap: () => ({ message: "Role harus dipilih" }),
  }),
})

type FieldProps<Name extends keyof RegisterForm> = {
  field: ControllerRenderProps<RegisterForm, Name>;
};

type RegisterForm = z.infer<typeof schema>;

export default function Register() {
  const router = useRouter(); 
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<RegisterForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      password: "",
      role: "user",
    },
  });

  async function onSubmit(values: RegisterForm) {
    setLoading(true);
    try {
      const response = await fetch("https://test-fe.mysellerpintar.com/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: values.username,
          password: values.password,
          role: values.role.charAt(0).toUpperCase() + values.role.slice(1),
        }),
      });
  
      const registerData = await response.json();
  
      if (!response.ok) {
        console.error("Registration failed", registerData);
        alert(registerData.message || "Registration failed");
        return;
      }
  
      const loginResponse = await fetch("https://test-fe.mysellerpintar.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: values.username,
          password: values.password,
        }),
      });
  
      const loginData = await loginResponse.json();
  
      if (!loginResponse.ok) {
        console.error("Auto-login failed", loginData);
        alert("Registration success, but login failed. Please login manually.");
        router.push("/login");
        return;
      }
  
      localStorage.setItem("token", loginData.token);
      localStorage.setItem("user_password", values.password); 

      const profileRes = await fetch("https://test-fe.mysellerpintar.com/api/auth/profile", {
        headers: {
          Authorization: `Bearer ${loginData.token}`,
        },
      });
      const profile = await profileRes.json();

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
  }

  return (
    <div className="bg-[#F3F4F6] h-screen items-center flex justify-center">
      <div className="bg-white w-full md:w-[400px] h-full md:h-fit rounded-xl flex flex-col justify-center gap-[24px] p-[16px]">
        <img src="logoipsum.png" className="object-none" />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }: FieldProps<"username">) => (
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
              render={({ field }: FieldProps<"password">) => (
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
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }: FieldProps<"role">) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih Role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="bg-blue-600" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </Button>
          </form>
        </Form>

        <div className="flex justify-center text-sm">
          <span>Already have an account?&nbsp;</span>
          <a href="/login" className="underline text-blue-600 cursor-pointer">Login</a>
        </div>
      </div>
    </div>
  );
}