"use client";

import { getCurrentUser } from "@/app/auth-actions/client/actions/index";
import React from "react";
import ParentSummary from "@/components/ParentSummary";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { Loader2 } from "lucide-react";

const Page = () => {
  const { data: user, error, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const user = await getCurrentUser();

      return user;
    },
  });

  if (error) {
    toast.error(error.message);
  }

  return (
    <>
      {isLoading ? (
        <div className="h-[80dvh] w-full flex flex-col items-center justify-center">
          <Loader2 className=" h-10 w-10 animate-spin" />
          <p>Hold on. Loading your dashboard...</p>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between font-bold">
            <h1 className="text-3xl">Dashboard</h1>
            <h2 className="text-xl font-bold">
              Welcome, {user?.user_metadata?.full_name}
            </h2>
          </div>
          <ParentSummary />
        </div>
      )}
    </>
  );
};

export default Page;
