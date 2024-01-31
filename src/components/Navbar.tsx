"use client";

import { getCurrentUser } from "@/app/auth-actions/client/actions";
import { useAuthStore } from "@/store/authStore";
import { UserAddOutlined, UserOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useEffect } from "react";
import Logo from "./Logo";
import { ModeToggle } from "./ModeToggle";
import UserMenu from "./UserMenu";
import { Button } from "./ui/button";
import { useQuery } from "@tanstack/react-query";
import { redirect } from "next/navigation";

const Navbar = () => {
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const user = await getCurrentUser();

      if(!user){
        redirect('/login')
      }

      return user;
    },
  });

  return (
    <div className="py-4 px-8 flex w-full fixed z-20 items-center justify-between bg-inherit">
      <Logo />
      <div className="flex items-center gap-16">
        <ModeToggle />
        {user ? (
          <UserMenu user={user} />
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
