"use client";

import SignupForm from "@/components/SignUpForm";
import SignUpOptions from "@/components/SignUpOptions";
import { useAuthStore } from "@/store/authStore";
import { useFormStore } from "@/store/formStore";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const page = () => {
  const [step] = useFormStore((state) => [state.step]);
  const [user] = useAuthStore((state) => [state.user]);
  const router = useRouter();

  useEffect(() => {
    if (user) router.push("/dashboard");
  }, []);

  switch (step) {
    case 1:
      return <SignUpOptions />;
      break;
    case 2:
      return <SignupForm />;
      break;
    default:
      return;
      break;
  }
};

export default page;
