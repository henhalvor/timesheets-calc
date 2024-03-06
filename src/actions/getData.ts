"use server";

import prisma from "@/lib/prisma";
import { getUserId } from "@/lib/user";
import { getAllUserTimesheets } from "@/lib/userImages";
import { multiplyArrayElements } from "@/lib/utils";
import { TimesheetType } from "@/types";

async function getDashboardTimesheetsDataByYear(year: number) {
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
        uploadDate: true,
        weekNumber: true,
      },
    });

    const data = allData.filter((timesheet) => {
      const timesheetYear = new Date(
        Number(BigInt(timesheet.uploadDate))
      ).getFullYear();
      return timesheetYear === year;
    });

    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getDashboardModalData(year: number) {
  try {
    const data = await getDashboardTimesheetsDataByYear(year);
    if (!data || data.length < 1) {
      return null;
    }
    const regularHoursData = data.map((item) => {
      return {
        [item.weekNumber]: item.regularHours,
      };
    });
    const accruedHoursData = data.map((item) => {
      return {
        [item.weekNumber]: item.accruedHours,
      };
    });
    const usedAccruedHoursData = data.map((item) => {
      return {
        [item.weekNumber]: item.usedAccruedHours,
      };
    });;
    const overtimeHoursData = data.map((item) => {
      return {
        [item.weekNumber]: item.overtimeHours,
      };
    });
    const travelDistanceKMData = data.map((item) => {
      return {
        [item.weekNumber]: item.travelDistanceKM,
      };
    });;
    const extraToolCompensationData = data.map((item) => {
      return {
        [item.weekNumber]: item.extraToolCompensation,
      };
    });
    const extraTransportationCompensationData = data.map((item) => {
      return {
        [item.weekNumber]: item.extraTransportationCompensation,
      };
    });
    const accruedHoursLeftData = [
      data.map((item) => item.accruedHours).reduce(
        (accumulator, currentValue) => accumulator + currentValue
      ) -
      data.map((item) => item.usedAccruedHours).reduce(
          (accumulator, currentValue) => accumulator + currentValue
        ),
    ];

    const totalHoursData = [
      data.map((item) => item.regularHours).reduce(
        (accumulator, currentValue) => accumulator + currentValue
      ) +
      data.map((item) => item.accruedHours).reduce(
          (accumulator, currentValue) => accumulator + currentValue
        ) +
        data.map((item) => item.overtimeHours).reduce(
          (accumulator, currentValue) => accumulator + currentValue
        )
    ];
    return {
      regularHoursData,
      accruedHoursLeftData,
      usedAccruedHoursData,
      overtimeHoursData,
      totalHoursData,
      travelDistanceKMData,
      extraToolCompensationData,
      extraTransportationCompensationData,
    };
  } catch (error) {
    console.log(error);
  }
}

export async function getDashboardCardData(year: number) {
  try {
    const data = await getDashboardTimesheetsDataByYear(year);
    if (!data) {
      return null;
    }

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
