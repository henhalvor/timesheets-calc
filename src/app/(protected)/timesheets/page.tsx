import UsersTimesheets from "@/components/UsersTimesheets";
import { getAllUserTimesheets } from "@/lib/userImages";
import React from "react";

export default async function Page() {
  const timesheets = await getAllUserTimesheets();
  return (
    <div>
      <UsersTimesheets timesheets={timesheets}/>
    </div>
  );
}
