import { getTimesheetById } from "@/lib/userImages";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";
import ImageIndex from "@/components/ImageIndex";

export default async function Page({ params }: { params: { slug: string } }) {
  const timesheet = await getTimesheetById(params.slug);

  // Check if the timesheet exists
  if (!timesheet) {
    notFound();
  }

  return (
    <div className=" w-auto flex flex-col md:flex-row gap-2 items-center justify-center m-8">
      <div className="border-solid border-gray-500 border-[1px] rounded-md p-1">
        <Image
          className="h-auto w-60"
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
