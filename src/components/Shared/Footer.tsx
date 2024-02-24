import React from "react";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

export default function Footer() {
  return (
    <footer className="w-auto flex justify-end items-center p-4 bg-gray-500 m-0">
      <LogoutLink className="" >Log out</LogoutLink>
    </footer>
  );
}
2;
