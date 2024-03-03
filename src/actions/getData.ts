"use server"

import prisma from "@/lib/prisma";
import { getUserId } from "@/lib/user";
import { multiplyArrayElements } from "@/lib/utils";

export async function getDashboardData(year: number) {
  try {
    const userId = await getUserId();

    const allData = await prisma.timesheet.findMany({
      where: { userId: userId },
      select: {
        regularHours: true,
        accruedHours: true,
        usedAccruedHours: true,
        overtimeHours: true,
        extraToolCompensation: true,
        extraTransportationCompensation: true,
        travelDistanceKM: true,
        uploadDate: true
      },
    });

    const data = allData.filter((timesheet) => {
      const timesheetYear = new Date(Number(BigInt(timesheet.uploadDate))).getFullYear();
      return timesheetYear === year;
    });


    const regularHours = multiplyArrayElements(
      data.map((timesheet) => timesheet.regularHours)
    );

    const accruedHours = multiplyArrayElements(
      data.map((timesheet) => timesheet.accruedHours)
    );
    const usedAccruedHours = multiplyArrayElements(
      data.map((timesheet) => timesheet.usedAccruedHours)
    );
    const overtimeHours = multiplyArrayElements(
      data.map((timesheet) => timesheet.overtimeHours)
    );
    const extraToolCompensation = multiplyArrayElements(
      data.map((timesheet) => timesheet.extraToolCompensation)
    );
    const extraTransportationCompensation = multiplyArrayElements(
      data.map((timesheet) => timesheet.extraTransportationCompensation)
    );
    const travelDistanceKM =
      multiplyArrayElements(
        data.map((timesheet) => timesheet.travelDistanceKM)
      ) * 2;

    const totalHours = regularHours + accruedHours + overtimeHours;
    const accruedHoursLeft = accruedHours - usedAccruedHours;

    return {
      regularHours,
      accruedHoursLeft,
      usedAccruedHours,
      overtimeHours,
      totalHours,
      extraToolCompensation,
      extraTransportationCompensation,
      travelDistanceKM,
    };
  } catch (error) {
    console.log(error);
  }
}
