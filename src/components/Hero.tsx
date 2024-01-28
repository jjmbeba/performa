"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { TypewriterEffect } from "./ui/typewriter-effect";
import React from 'react'

const Hero = () => {
     const words = [
    {
      text: "Analyze",
    },
    {
      text: "your",
    },
    {
      text: "child's",
    },
    {
      text: "performance",
    },
    {
      text: "with",
    },
    {
      text: "Performa.",
      className: "text-primary dark:text-primary",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-[40rem] ">
      <p className="text-neutral-600 dark:text-neutral-200 text-base  mb-10">
        The road to performance analysis starts from here
      </p>
      <TypewriterEffect words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 mt-10">
        <Button asChild variant={"default"}>
          <Link href={'/signup'}>Get started</Link>
        </Button>
        <Button asChild variant={"secondary"}>
          <Link href={'/login'}>Login</Link>
        </Button>
      </div>
    </div>
  );
}

export default Hero