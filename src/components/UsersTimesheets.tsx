"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { useRouter } from "next/navigation";
import { TimesheetType } from "@/types";
import { getTimesheetsForYear, sortTimesheets } from "@/lib/timesheets";
import { getListedYears } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UsersTimesheetsProps {
  timesheets: TimesheetType[] | null;
}

export default function UsersTimesheets({ timesheets }: UsersTimesheetsProps) {
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString()
  ); // set to current year

  if (!timesheets) {
    notFound(); // change to message saying user has no timesheets
  }

  const router = useRouter();

  const filteredTimesheets = getTimesheetsForYear(Number(selectedYear), timesheets);
 

  const listedYears = getListedYears(10);
  return (
    <div>
      <div className="flex justify-center mt-8 mb-4">
        <Select value={selectedYear} onValueChange={setSelectedYear}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent>
            {listedYears.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="image-gallery flex flex-col sm:flex-row sm:flex-wrap gap-3 m-4 p-4">
        {filteredTimesheets == null && (
          <p className="text-center">No timesheets found for this year</p>
        )}
        {filteredTimesheets && filteredTimesheets.map((timesheet, index) => (
          <div
            key={index}
            className="relative flex flex-col gap-2 items-center hover:cursor-pointer hover:scale-105 rounded-md bg-primary-foreground border-solid border-border border-[1px] p-1"
            onClick={() => {
              router.push(`/timesheets/${timesheet.id}`);
            }}
          >
            <p className="font-bold">Week {timesheet.weekNumber}</p>
            <p className="absolute font-extralight text-xs right-1">
              {new Date(Number(BigInt(timesheet.uploadDate)))
                .toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })
                .substring(6, 10)}
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
    </div>
  );
}
