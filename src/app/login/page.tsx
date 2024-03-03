import React from "react";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "TimeSheets-Calc | Login",
  description: "Login to TimeSheets-Calc",
  keywords: ["login"]
};


export default function Login() {
  return (
    <div>
      <LoginLink>Sign in</LoginLink>
    </div>
  );
}
