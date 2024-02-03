import { getSession } from "@/app/auth-actions/server/actions";
import { UserAddOutlined, UserOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import Logo from "./Logo";
import { ModeToggle } from "./ModeToggle";
import UserMenu from "./UserMenu";
import { Button } from "./ui/button";

const Navbar = async () => {
  // const router = useRouter();

  // const { data: user } = useQuery({
  //   queryKey: ["session"],
  //   queryFn: async () => {
  //     const {user} = await getSession();

  //     if(!user){
  //       router.push('/login')
  //     }

  //     return user;
  //   },
  // });

  const { session, error } = await getSession();

  if(!session){
    redirect('/login');
  }

  return (
    <div className="py-4 px-8 flex w-full fixed z-20 items-center justify-between bg-inherit">
      <Logo />
      <div className="flex items-center gap-16">
        <ModeToggle />
        {session.user ? (
          <UserMenu user={session.user} />
        ) : (
          <div className="flex items-center gap-4">
            <Link href={"/signup"}>
              <Button className="font-semibold" variant={"default"}>
                <UserAddOutlined className="mr-2 h-4 w-4" />
                Signup
              </Button>
            </Link>
            <Link href={"/login"}>
              <Button className="font-semibold" variant={"secondary"}>
                <UserOutlined className="mr-2 h-4 w-4" />
                Login
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
