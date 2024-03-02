"use server";

import prisma from "@/lib/prisma";
import { getTimesheetById } from "@/lib/userImages";
import { del, put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function editTimesheet(id: string, formData: FormData) {
  try {
    const originalTimesheet = await getTimesheetById(id);
    if (!originalTimesheet) {
      throw new Error("To be edited timesheet not found in database");
    }



    let imageUrl;
    let imageDownloadUrl;

    const newImageFile = formData.get("image") as File;
    if (newImageFile.size !== 0 || newImageFile.name !== "undefined") {
      const blob = await put(newImageFile.name, newImageFile, {
        access: "public",
      });
      imageUrl = blob.url;
      imageDownloadUrl = blob.downloadUrl;

      // delete old image from blob store
      await del(originalTimesheet.imageUrl);
    } else {
      imageUrl = originalTimesheet.imageUrl;
      imageDownloadUrl = originalTimesheet.imageDownloadUrl;
    }

    const weekNumber = Number(formData.get("week-number"));
    const regularHours = Number(formData.get("hours"));
    const accruedHours = Number(formData.get("accrued-hours")) || 0;
    const usedAccruedHours = Number(formData.get("used-accrued-hours")) || 0;
    const overtimeHours = Number(formData.get("overtime-hours")) || 0;
    const travelDistanceKM = Number(formData.get("travel-distance")) || 0;
    const extraToolCompensation =
      Number(formData.get("extra-tool-compensation")) || 0;
    const extraTransportationCompensation =
      Number(formData.get("extra-transportation-compensation")) || 0;

    const newEntry = await prisma.timesheet.update({
      where: { id },
      data: {
        imageUrl,
        imageDownloadUrl,
        weekNumber,
        regularHours,
        accruedHours,
        usedAccruedHours,
        overtimeHours,
        travelDistanceKM,
        extraToolCompensation,
        extraTransportationCompensation,
      },
    });

    console.log(newEntry);
  } catch (error) {
    console.log(error);
    return;
  }

  revalidatePath(`/timesheets/${id}`);
  redirect(`/timesheets/${id}`);
}
