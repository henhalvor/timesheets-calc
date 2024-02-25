import prisma from "@/lib/prisma";
import { getUserId } from "@/lib/user";
import { del } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getAllUserTimesheets() {
  try {
    const userId = await getUserId();

    const timesheets = await prisma.timesheet.findMany({
      where: { userId: userId },
      select: {
        id: true,
        userId: true,
        imageUrl: true,
        imageDownloadUrl: true,
        weekNumber: true,
        uploadDate: true,
        regularHours: true,
        accruedHours: true,
        usedAccruedHours: true,
        overtimeHours: true,
        travelDistanceKM: true,
        extraToolCompensation: true,
        extraTransportationCompensation: true,
      },
    });

    return timesheets;
  } catch (error) {
    throw error;
  }
}

export async function getTimesheetByWeekNumber(weekNumber: number) {
  try {
    const userId = await getUserId();

    const timesheet = await prisma.timesheet.findFirst({
      where: { userId: userId, weekNumber: weekNumber },
      select: {
        id: true,
        userId: true,
        imageUrl: true,
        imageDownloadUrl: true,
        weekNumber: true,
        uploadDate: true,
        regularHours: true,
        accruedHours: true,
        usedAccruedHours: true,
        overtimeHours: true,
        travelDistanceKM: true,
        extraToolCompensation: true,
        extraTransportationCompensation: true,
      },
    });

    return timesheet;
  } catch (error) {
    throw error;
  }
}

export async function getTimesheetById(id: string) {
  try {
    const userId = await getUserId();

    const timesheet = await prisma.timesheet.findFirst({
      where: { userId: userId, id: id },
      select: {
        id: true,
        userId: true,
        imageUrl: true,
        imageDownloadUrl: true,
        weekNumber: true,
        uploadDate: true,
        regularHours: true,
        accruedHours: true,
        usedAccruedHours: true,
        overtimeHours: true,
        travelDistanceKM: true,
        extraToolCompensation: true,
        extraTransportationCompensation: true,
      },
    });

    return timesheet;
  } catch (error) {
    throw error;
  }
}


