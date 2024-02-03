"use client";

import {
  getSession
} from "@/app/auth-actions/client/actions/index";
import ParentSummary from "@/components/ParentSummary";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const Page = () => {
  const {
    data: session,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const { session , error } = await getSession();

      return { session, error };
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
              Welcome, {session?.session?.user?.user_metadata?.full_name}
            </h2>
          </div>
          <ParentSummary />
        </div>
      )}
    </>
  );
};

export default Page;
