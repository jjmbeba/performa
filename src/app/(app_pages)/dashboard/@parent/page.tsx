"use client";

import { getCurrentUser } from "@/app/auth-actions/server/actions";
import React from "react";
import ParentSummary from "@/components/ParentSummary";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { redirect } from "next/navigation";

const page = () => {
  const { data: user, error } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const user = await getCurrentUser();

      return user;
    },
  });

  if (error) {
    toast.error(error.message);
  }

  if (!user) {
    redirect("/login");
  }

  return (
    <div>
      <div className="flex items-center justify-between font-bold">
        <h1 className="text-3xl">Dashboard</h1>
        <h2 className="text-xl font-bold">
          Welcome, {user?.user_metadata.full_name}
        </h2>
      </div>
      <ParentSummary />
    </div>
  );
};

export default page;
