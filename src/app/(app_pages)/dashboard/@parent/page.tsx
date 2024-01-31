import { getCurrentUser } from "@/app/auth-actions/server/actions";
import React from "react";
import ParentSummary from '@/components/ParentSummary'

const page = async () => {
  const user = await getCurrentUser();

  if (user) {
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
  }
};

export default page;
