import EditTimesheetForm from "@/components/edit-timesheet-form";
import { getTimesheetById } from "@/lib/userImages";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
  title: "TimeSheets-Calc | Edit",
  description: "Edit timesheet.",
  keywords: ["edit", "timesheet", "change"]
};


export default async function page({ params }: { params: { slug: string } }) {
  const timesheet = await getTimesheetById(params.slug);

  // Check if the timesheet exists
  if (!timesheet) {
    notFound();
  }
  return (
  <div>
    <EditTimesheetForm id={params.slug} />
  </div>
  );
}
