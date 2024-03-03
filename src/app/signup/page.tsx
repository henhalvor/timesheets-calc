import React from "react";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "TimeSheets-Calc | Sign Up",
  description: "Sign Up for an account.",
  keywords: ["signup"]
};


export default function SignUp() {
  return (
    <div>
      <RegisterLink>Sign up</RegisterLink> { /* REMOVE LINK TO REGISTER */ }
    </div>
  );
}
