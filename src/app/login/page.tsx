"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/authStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { toast } from "sonner";
import { getSession, signInUser } from "../auth-actions/client/actions";

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

  const { data: session } = useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const { session, error } = await getSession();

      if (error) {
        toast.error(error.message);
      }

      if (session) {
        redirect("/dashboard");
      }

      return;
    },
  });

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

      if (error) {
        toast.error(error.message);
      }

      if (data && data.user) {
        toast.success("Login successful");
        router.push("/dashboard");
      }

      return;
    },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    mutate(values);
  }

  const [hide, setHide] = useState(false);

  return (
    <div className="max-w-lg mx-auto mt-5 py-24">
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
