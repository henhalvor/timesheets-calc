import { deleteTimesheetById } from "@/actions/delete";
import { TimesheetType } from "@/types";
import React from "react";

type TimesheetIndexProps = {
  timesheet: TimesheetType | null;
};

export default function TimesheetIndex({ timesheet }: TimesheetIndexProps) {
  if (!timesheet) {
    return null;
  }

  const uploadDate = new Date(Number(BigInt(timesheet.uploadDate)));
  return (
    <div className="flex w-[310px] md:flex-1 md:w-auto flex-col justify-between items-center border-solid border-gray-500 border-[1px] rounded-md p-4 relative gap-10">
      <div className="flex flex-col gap-3">
        <h2 className="text-2xl font-bold self-center mb-8 text-black">
          Week {timesheet.weekNumber}
        </h2>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="flex flex-col gap-3 *:underline *:underline-offset-4 *:text-black">
            <p>Hours: <span className="font-semibold">{timesheet.regularHours}</span></p>
            <p>Accrued Hours: <span className="font-semibold">{timesheet.accruedHours}</span></p>
            <p>Used Accrued Hours: <span className="font-semibold">{timesheet.usedAccruedHours}</span></p>
            <p>Overtime Hours: <span className="font-semibold">{timesheet.overtimeHours}</span></p>
          </div>
          <div className="flex flex-col gap-3 *:underline *:underline-offset-4 *:text-black">
            <p>Travel Distance: <span className="font-semibold">{timesheet.travelDistanceKM} KM</span></p>
            <p>Tool Comp: <span className="font-semibold">{timesheet.extraToolCompensation} KR</span></p>
            <p>Transport Comp: <span className="font-semibold">{timesheet.extraTransportationCompensation} KR</span></p>
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-12 mb-4 items-center">
        <div className="flex flex-col gap-3">
          <a
            className="text-black block italic text-2xl font-medium underline underline-offset-4 mb-4 self-center hover:scale-105"
            href={timesheet.imageUrl}
          >
            Open
          </a>
          <a
            className="text-black block italic text-2xl font-medium underline underline-offset-4 self-center hover:scale-105"
            href={timesheet.imageDownloadUrl}
          >
            Download
          </a>
        </div>
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
          <button className=" text-white rounded-md p-2  hover:font-semibold hover:scale-105 m-2 bg-red-700">
            Delete Timesheet
          </button>
        </form>
      </div>
      <p className="text-black text-xs absolute bottom-0 right-2">
          Uploaded:{" "}
          {uploadDate.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </p>
    </div>
  );
}
