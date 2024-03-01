import React from "react";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Footer() {
  return (
    <footer className="w-auto flex justify-end items-center p-4 bg-background border-solid border-t-border border-t-[1px]">
      <div className="ml-0 mr-auto">
        <ThemeToggle />
      </div>
      <LogoutLink className="font-light">Log out</LogoutLink>
    </footer>
  );
}
2;
