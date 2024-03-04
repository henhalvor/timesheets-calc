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



export function getListedYears(numberOfYears: number) {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = currentYear; i >= currentYear - (numberOfYears - 1); i--) {
    years.push(i);
  }
  return years;
}
