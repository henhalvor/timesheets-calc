import { TimesheetForm } from "@/components/timesheet-form";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "TimeSheets-Calc | Upload",
  description: "Upload a timesheets details and image.",
  keywords: ["upload", "timesheet"],
};

export default function Page() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <TimesheetForm />
    </div>
  );
}
