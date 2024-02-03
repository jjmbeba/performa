import { getUserRole } from "@/app/auth-actions/server/actions";

export default async function Layout({
  parent,
  admin,
}: {
  parent: React.ReactNode;
  admin: React.ReactNode;
}) {
 
    const data = await getUserRole();
    const role = data?.userRole?.[0]?.role;

    return <>
    {role === "admin" ? admin : parent}</>;
  }  

