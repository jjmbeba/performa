"use client";

import React, { Dispatch, SetStateAction } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { User } from "@supabase/supabase-js";
import { signOutUser } from "@/app/auth-actions/client/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { UserState } from "@/store/authStore";

interface Props extends UserState {}

const UserMenu = ({ user, setUser }: Props) => {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.user_metadata.avatar_url}/>
          <AvatarFallback>
            {user?.user_metadata.full_name.split(" ").map((a: string) => a.charAt(0))}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="*:cursor-pointer">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={async () => {
            const { error } = await signOutUser();

            if (error?.message) {
              toast.error(error.message);
            } else {
              setUser(null);
              router.push("/");
            }
          }}
          className="text-red-600"
        >
          <LogOut className="mr-2 w-4 h-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
