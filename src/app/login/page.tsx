"use client";

import React, { useEffect, useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { signInUser } from "../auth-actions/client/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { revalidatePath } from "next/cache";
import { revalidate } from "../auth-actions/server/actions";

const loginSchema = z.object({
  email: z.string().email({
    message: "Enter a valid email",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
});

const Page = () => {
  const router = useRouter();
  const [user, setUser] = useAuthStore((state) => [state.user, state.setUser]);

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [router, user]);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { data, error, isPending, isSuccess, mutate } = useMutation({
    mutationKey: ["signup"],
    mutationFn: async (values: z.infer<typeof loginSchema>) => {
      const { data, error } = await signInUser(values);

      return { data, error };
    },
  });

  useEffect(() => {
    if (error?.message) {
      toast.error(error.message);
    } else if (data?.error) {
      toast.error(data.error.message);
    } else if (isSuccess) {
      toast.success("Login successful");
      setUser(data.data.user);
      revalidate();
      router.push("/dashboard");
    }
  }, [error, isSuccess, data, setUser, router]);

  function onSubmit(values: z.infer<typeof loginSchema>) {
    mutate(values);
  }

  const [hide, setHide] = useState(false);

  return (
    <div className="max-w-lg mx-auto mt-5">
      <h1 className="font-bold text-4xl">Login into your account</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="johndoe@gmail.com" {...field} />
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
                  <div className="relative">
                    <Input
                      type={hide ? "text" : "password"}
                      placeholder="my-super-secret-password"
                      {...field}
                    />
                    <Button
                      onClick={() => setHide((prev) => !prev)}
                      variant={"ghost"}
                      className="absolute top-1/2 translate-y-[-50%] right-0"
                      type="button"
                    >
                      {hide ? "Hide" : "Show"}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col items-start justify-start">
            <Button variant={"link"}>
              <Link href={"/signup"}>Don&apos;t have an account?</Link>
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 w-4 h-4 animate-spin" />}
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Page;
