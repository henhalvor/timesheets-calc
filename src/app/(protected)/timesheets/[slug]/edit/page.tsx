import EditTimesheetForm from "@/components/edit-timesheet-form";
import { getTimesheetById } from "@/lib/userImages";
import { notFound } from "next/navigation";
import React from "react";

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
