import { redirect } from "next/navigation";
import { getCurrentUser } from "../auth-actions/server/actions";

const Page = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return <div className="px-8 pt-8 float-right">
    <h1 className="text-2xl font-bold">Welcome, {user?.user_metadata.name}</h1>
  </div>;
};

export default Page;
