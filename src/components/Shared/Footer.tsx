import React from "react";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

export default function Footer() {
  return (
    <footer className="h-20 flex justify-end items-center pr-6 bg-gray-500">
      <LogoutLink className="" >Log out</LogoutLink>
    </footer>
  );
}
2;
