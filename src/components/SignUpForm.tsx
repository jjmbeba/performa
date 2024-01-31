"use client";
import React from "react";

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
import { toast } from "sonner";

import { useMutation } from "@tanstack/react-query";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { signUpNewUser } from "@/app/auth-actions/client/actions";

import { useRouter } from "next/navigation";
import { useFormStore } from "@/store/formStore";
import { motion } from "framer-motion";
import { revalidatePath } from "next/cache";

const signupSchema = z
  .object({
    email: z.string().email({
      message: "Enter a valid email",
    }),
    fullName: z.string().min(2, {
      message: "Full name must be at least 2 characters",
    }),
    phoneNumber: z.string().length(10, {
      message: "Phone number must have 10 digits",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters",
    }),
    confirmPassword: z.string().min(6, {
      message: "Password must be at least 6 characters",
    }),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Password and confirm password do not match",
    path: ["confirmPassword"],
  });

const SignupForm = () => {
  const router = useRouter();
  const [onHandleBack] = useFormStore((state) => [state.onHandleBack]);

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      fullName: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { data, error, isPending, isSuccess, mutate } = useMutation({
    mutationKey: ["signup"],
    mutationFn: async (values: z.infer<typeof signupSchema>) => {
      const { data, error } = await signUpNewUser(values);

      return { data, error };
    },
  });

  useEffect(() => {
    if (error?.message) {
      toast.error(error.message);
    } else if (data?.error) {
      toast.error(data.error.message);
    } else if (isSuccess) {
      toast.success("Account created successfully");
      revalidatePath("/", "layout");
      router.push("/dashboard");
    }
  }, [error, isSuccess, data, router]);

  function onSubmit(values: z.infer<typeof signupSchema>) {
    mutate(values);
  }

  const [hidePassword, setHidePassword] = useState(false);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(false);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {
          opacity: 0,
          translateX: 100,
        },
        visible: {
          opacity: 1,
          transition: {
            delay: 0.5,
          },
          translateX: 0,
        },
      }}
      className="max-w-lg mx-auto mt-2"
    >
      <div className="flex flex-col items-start gap-4">
        <Button onClick={onHandleBack} variant={"default"} size={"icon"}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="font-bold text-4xl">Create your account</h1>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center w-full gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-1/2">
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
              name="phoneNumber"
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="0712345678" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={hidePassword ? "text" : "password"}
                      placeholder="my-super-secret-password"
                      {...field}
                    />
                    <Button
                      onClick={() => setHidePassword((prev) => !prev)}
                      variant={"ghost"}
                      className="absolute top-1/2 translate-y-[-50%] right-0"
                      type="button"
                    >
                      {hidePassword ? "Hide" : "Show"}
                    </Button>
                  </div>
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
                  <div className="relative">
                    <Input
                      type={hideConfirmPassword ? "text" : "password"}
                      placeholder="my-super-secret-password"
                      {...field}
                    />
                    <Button
                      onClick={() => setHideConfirmPassword((prev) => !prev)}
                      variant={"ghost"}
                      className="absolute top-1/2 translate-y-[-50%] right-0"
                      type="button"
                    >
                      {hideConfirmPassword ? "Hide" : "Show"}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col items-start justify-start">
            <Button variant={"link"}>
              <Link href={"/login"}>Already have an account?</Link>
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 2-4 animate-spin" />}
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  );
};

export default SignupForm;
