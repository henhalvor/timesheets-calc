import { getTimesheetById } from "@/lib/userImages";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";
import TimesheetIndex from "@/components/TimesheetIndex";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "TimeSheets-Calc | Details",
  description: "Detailed overview of a timesheets content.",
  keywords: ["details", "timesheet"]
};


export default async function Page({ params }: { params: { slug: string } }) {
  const timesheet = await getTimesheetById(params.slug);

  // Check if the timesheet exists
  if (!timesheet) {
    notFound();
  }

  return (
    <div className="h-min w-auto flex flex-col md:flex-row gap-2 m-8">
      <div className=" m-auto border-solid border-border border-[1px] rounded-md p-1">
        <Image
          className="h-auto w-[300px]"
          src={timesheet.imageUrl}
          alt="Image of timesheet"
          width={600}
          height={1000}
        />
      </div>
      <TimesheetIndex timesheet={timesheet} />
    </div>
  );
}
