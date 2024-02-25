import UsersImages from "@/components/UsersImages";
import { getAllUserTimesheets } from "@/lib/userImages";
import React from "react";

export default async function Page() {
  const images = await getAllUserTimesheets();
  return (
    <div>
      <UsersImages images={images}/>
    </div>
  );
}
