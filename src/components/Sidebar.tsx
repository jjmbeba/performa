"use client";

import {
  UsergroupAddOutlined
} from "@ant-design/icons";
import {
  BarChart4,
  CalendarCheck2,
  Contact,
  LayoutDashboard,
  LibraryBig,
  LogOut,
  Megaphone,
  MessagesSquare,
  Settings,
  TableProperties
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

type Props = {
  role: string;
};

const Sidebar = ({ role}: Props) => {
  const parentMenuItems = [
    {
      text: "Dashboard",
      link: "/dashboard",
      icon: <LayoutDashboard className="mr-2 w-4 h-4" />,
    },
    {
      text: "My children",
      link: "/my-children",
      icon: <UsergroupAddOutlined className="mr-2 w-4 h-4" />,
    },
    {
      text: "Academics",
      link: "/academics",
      icon: <LibraryBig className="mr-2 w-4 h-4" />,
    },
    {
      text: "Attendance",
      link: "/attendance",
      icon: <TableProperties className="mr-2 w-4 h-4" />,
    },
    {
      text: "Teachers and contacts",
      link: "/teachers",
      icon: <Contact className="mr-2 w-4 h-4" />,
    },
    {
      text: "Class schedules",
      link: "/schedules",
      icon: <CalendarCheck2 className="mr-2 w-4 h-4" />,
    },
    {
      text: "Events and announcements",
      link: "/events",
      icon: <Megaphone className="mr-2 w-4 h-4" />,
    },
    {
      text: "Reports and Assessments",
      link: "/reports",
      icon: <BarChart4 className="mr-2 w-4 h-4" />,
    },
    {
      text: "Communication",
      link: "/communication",
      icon: <MessagesSquare className="mr-2 w-4 h-4" />,
    },
    {
      text: "Settings",
      link: "/settings",
      icon: <Settings className="mr-2 w-4 h-4" />,
    },
  ];

  const pathname = usePathname();

  return (
    <div className="pl-8 pt-24 fixed h-[100dvh] flex flex-col items-start max-w-[300px]">
      {role === "parent" &&
        parentMenuItems.map(({ link, text, icon }, index) => (
          <Button
            key={link}
            variant={"ghost"}
            className={`${pathname === link && "text-primary"} text-md`}
          >
            <Link className="flex items-center" href={link}>
              {icon}
              {text}
            </Link>
          </Button>
        ))}
      <Button
        className="text-red-600 float-end mt-20 text-md"
        variant={"ghost"}
      >
        <LogOut className="mr-2 w-4 h-4" />
        Logout
      </Button>
    </div>
  );
};

export default Sidebar;
