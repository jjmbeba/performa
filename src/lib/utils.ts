import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/"
    : process.env.NEXT_PUBLIC_URL;
