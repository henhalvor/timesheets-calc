import { TimesheetType } from "@/types";

export function sortTimesheets(timesheets: TimesheetType[]) {
  // sort the timesheets by year and then by week number
  timesheets.sort((a, b) => {
    // First, compare the years
    if (
      new Date(Number(BigInt(a.uploadDate))).getFullYear() !==
      new Date(Number(BigInt(b.uploadDate))).getFullYear()
    ) {
      return (
        new Date(Number(BigInt(a.uploadDate))).getFullYear() -
        new Date(Number(BigInt(b.uploadDate))).getFullYear()
      );
    }
    // If years are same, compare week numbers
    return a.weekNumber - b.weekNumber;
  });
  return timesheets;
}


export function getTimesheetsForYear(year: number, timesheets: TimesheetType[]) {
  let filteredTimesheets = timesheets.filter((timesheet) => {
    const timesheetYear = new Date(Number(BigInt(timesheet.uploadDate))).getFullYear();
    return timesheetYear === year;
  });

  if (filteredTimesheets.length === 0) {
    return null;
  }

  filteredTimesheets = sortTimesheets(filteredTimesheets)
  
  return filteredTimesheets;
}