// import { checkUserRole } from "@/lib/auth";

import { getCurrentUser, getUserRole } from "@/app/auth-actions/server/actions";
import { redirect } from "next/navigation";

export default async function Layout({
  parent,
  admin,
}: {
  parent: React.ReactNode;
  admin: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if(!user){
    redirect('/login');
  }else{
    const data = await getUserRole();
    const role = data?.userRole?.[0]?.role;

    return <>
    {role === "admin" ? admin : parent}</>;
  }  
}
