import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import prisma from "@/lib/prisma";
import { getUserId } from "@/lib/user";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function multiplyArrayElements(arr: number[]) {
  return arr.reduce((acc, curr) => acc + curr, 0);
}
