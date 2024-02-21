import React from "react";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";

export default function SignUp() {
  return (
    <div>
      <RegisterLink>Sign up</RegisterLink> { /* REMOVE LINK TO REGISTER */ }
    </div>
  );
}
