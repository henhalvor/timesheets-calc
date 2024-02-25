import { deleteTimesheetById } from "@/actions/delete";
import { TimesheetType } from "@/types";
import React from "react";

type TimesheetIndexProps = {
  timesheet: TimesheetType | null;
};

export default function ImageIndex({ timesheet }: TimesheetIndexProps) {
  if (!timesheet) {
    return null;
  }

  const uploadDate = new Date(Number(BigInt(timesheet.uploadDate)));
  return (
    <div className="h-[330px] w-full flex flex-1 flex-col justify-between items-center border-solid border-gray-500 border-[1px] rounded-md p-2">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold">Week {timesheet.weekNumber}</h2>
        <p className="mb-8">
          Uploaded:{" "}
          {uploadDate.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </p>
        <a
          className="block italic text-2xl font-medium underline underline-offset-4 mb-4 self-center"
          href={timesheet.imageUrl}
        >
          Open
        </a>
        <a
          className="block italic text-2xl font-medium underline underline-offset-4 self-center"
          href={timesheet.imageDownloadUrl}
        >
          Download
        </a>
      </div>
      <div>
        <form action={deleteTimesheetById}>
          <label className="hidden">Image Id</label>
          <input
            type="text"
            id="id"
            name="id"
            value={timesheet.id}
            readOnly
            className="hidden"
          />
          <button className=" text-black border-solid border-gray-500 border-[1px] rounded-md p-2 hover:border-black hover:font-semibold hover:scale-105 m-2">
            Delete Image
          </button>
        </form>
      </div>
    </div>
  );
}
