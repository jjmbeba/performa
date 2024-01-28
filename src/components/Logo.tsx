import React from "react";
import Link from "next/link";

const Logo = () => {
  return (
    <div className="font-bold text-xl text-background bg-foreground py-2 px-4 rounded relative before:w-full before:h-full before:absolute before:content-[''] before:bg-primary before:left-2 before:rounded before:-bottom-2 before:-z-10 before:opacity-0 hover:before:opacity-75 before:transition-all before:duration-500 cursor-pointer">
      <Link href={"/"}>Performa</Link>
    </div>
  );
};

export default Logo;
