"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { useRouter } from "next/navigation";
import { TimesheetType } from "@/types";
import { sortTimesheets } from "@/lib/timesheets";

interface UsersTimesheetsProps {
  timesheets: TimesheetType[] | null;
}

export default function UsersTimesheets({ timesheets }: UsersTimesheetsProps) {
  if (!timesheets) {
    notFound(); // change to message saying user has no timesheets
  }

  const router = useRouter();

  const sortedTimesheets = sortTimesheets(timesheets);

  return (
    <div className="image-gallery flex flex-col sm:flex-row sm:flex-wrap gap-3 m-4 p-4">
      {sortedTimesheets.map((timesheet, index) => (
        <div
          key={index}
          className="relative flex flex-col gap-2 items-center hover:cursor-pointer hover:scale-105 rounded-md bg-primary-foreground border-solid border-border border-[1px] p-1"
          onClick={() => {
            router.push(`/timesheets/${timesheet.id}`);
          }}
        >
          <p className="font-bold">Week {timesheet.weekNumber}</p>
          <p className="absolute font-extralight text-xs right-1">
            {new Date(Number(BigInt(timesheet.uploadDate))).toLocaleDateString(
              "en-GB",
              {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              }
            ).substring(6, 10)}
          </p>
          <Image
            className="h-auto w-60"
            key={index}
            src={timesheet.imageUrl}
            alt={`Image ${index}`}
            width={600}
            height={1000}
          />
        </div>
      ))}
    </div>
  );
}
