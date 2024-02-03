"use client";

import SignupForm from "@/components/SignUpForm";
import SignUpOptions from "@/components/SignUpOptions";
import { useAuthStore } from "@/store/authStore";
import { useFormStore } from "@/store/formStore";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { getSession } from "../auth-actions/client/actions";
import { toast } from "sonner";

const Page = () => {
  const [step] = useFormStore((state) => [state.step]);
  const router = useRouter();

  const {} = useQuery({
    queryKey:['session'],
    queryFn:async() => {
      const {session, error} = await getSession();

      if(error){
        toast.error(error.message)
      }else if(session){
        router.push('/dashboard');
      }
    }
  })

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

export default Page;
