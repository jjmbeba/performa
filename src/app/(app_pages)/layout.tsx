import { getUserRole } from "@/app/auth-actions/server/actions";
import Sidebar from "@/components/Sidebar";
import React from "react";

const layout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {

  

    const data = await getUserRole();
    const role = data?.userRole?.[0]?.role;
    return (
      <div>
        <Sidebar role={role} />
        <div className="px-8 py-24 z-10 ml-[21rem] bg-background/80">
          {children}
        </div>
      </div>
    );
  
};

export default layout;
