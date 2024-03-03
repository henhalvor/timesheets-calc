import UsersTimesheets from "@/components/UsersTimesheets";
import { getAllUserTimesheets } from "@/lib/userImages";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "TimeSheets-Calc | Timesheets",
  description: "Overview of all timesheets.",
  keywords: ["timesheets", "overview"]
};


export default async function Page() {
  const timesheets = await getAllUserTimesheets();
  return (
    <div>
      <UsersTimesheets timesheets={timesheets}/>
    </div>
  );
}
