import { deleteTimesheetById } from "@/actions/delete";
import { TimesheetType } from "@/types";
import React from "react";
import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import ToastedButton from "./toasted-button";
import Link from "next/link";

type TimesheetIndexProps = {
  timesheet: TimesheetType | null;
};

export default function TimesheetIndex({ timesheet }: TimesheetIndexProps) {
  if (!timesheet) {
    return null;
  }

  const uploadDate = new Date(Number(BigInt(timesheet.uploadDate)));
  return (
    <div className="flex w-[310px] md:flex-1 md:w-auto flex-col justify-between items-center border-solid border-border border-[1px] rounded-md p-4 relative gap-10">
      <div className="flex flex-col gap-3">
        <Link className="absolute right-2 top-1" href={`/timesheets/${timesheet.id}/edit`}>Edit</Link>
        <h2 className="text-2xl font-bold self-center mb-8 ">
          Week {timesheet.weekNumber}
        </h2>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="flex flex-col gap-3 *:underline *:underline-offset-4">
            <p>
              Hours:{" "}
              <span className="font-semibold">{timesheet.regularHours}</span>
            </p>
            <p>
              Accrued Hours:{" "}
              <span className="font-semibold">{timesheet.accruedHours}</span>
            </p>
            <p>
              Used Accrued Hours:{" "}
              <span className="font-semibold">
                {timesheet.usedAccruedHours}
              </span>
            </p>
            <p>
              Overtime Hours:{" "}
              <span className="font-semibold">{timesheet.overtimeHours}</span>
            </p>
          </div>
          <div className="flex flex-col gap-3 *:underline *:underline-offset-4 ">
            <p>
              Travel Distance:{" "}
              <span className="font-semibold">
                {timesheet.travelDistanceKM} KM
              </span>
            </p>
            <p>
              Tool Comp:{" "}
              <span className="font-semibold">
                {timesheet.extraToolCompensation} KR
              </span>
            </p>
            <p>
              Transport Comp:{" "}
              <span className="font-semibold">
                {timesheet.extraTransportationCompensation} KR
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-12 mb-4 items-center">
        <div className="flex flex-col gap-3">
          <a
            className=" block italic text-2xl font-medium underline underline-offset-4 mb-4 self-center hover:scale-105"
            href={timesheet.imageUrl}
          >
            Open
          </a>
          <a
            className=" block italic text-2xl font-medium underline underline-offset-4 self-center hover:scale-105"
            href={timesheet.imageDownloadUrl}
          >
            Download
          </a>
        </div>
        {/* <form action={deleteTimesheetById}>
          <label className="hidden">Image Id</label>
          <input
            type="text"
            id="id"
            name="id"
            value={timesheet.id}
            readOnly
            className="hidden"
          />

          <Button
            variant={"destructive"}
            className="  rounded-md pt-6 pb-6 p2 text-md  hover:font-semibold hover:scale-105 m-2 "
          >
            Delete Timesheet
          </Button>
        </form> */}
        <AlertDialog>
          <AlertDialogTrigger>
            <Button
              variant={"destructive"}
              className="  rounded-md pt-6 pb-6 p2 text-md  hover:font-semibold hover:scale-105 m-2 "
            >
              Delete Timesheet
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
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
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  timesheet and remove it from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className="h-[40px] bg-destructive text-destructive-foreground hover:bg-destructive/90 p-0">
                  <ToastedButton
                    title="Deletion"
                    description="Successfully deleted timesheet!"
                    className="w-full h-full pl-4 pr-4"
                  >
                    Delete
                  </ToastedButton>
                </AlertDialogAction>
              </AlertDialogFooter>
            </form>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <p className=" text-xs absolute bottom-0 right-2">
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
