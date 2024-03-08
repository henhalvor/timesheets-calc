"use server";

import { revalidatePath } from "next/cache";
import { put, PutBlobResult } from "@vercel/blob";
import prisma from "@/lib/prisma";
import { getUserId } from "@/lib/user";
import { redirect } from "next/navigation";

async function uploadTimesheetToDb(
  blob: PutBlobResult,
  formData: FormData
) {
  const userId = await getUserId();
  const imageUrl = blob.url;
  const imageDownloadUrl = blob.downloadUrl;
  const uploadDate = Date.now();
  const weekNumber = Number(formData.get("week-number"));
  const regularHours = Number(formData.get("hours"));
  const accruedHours = Number(formData.get("accrued-hours")) || 0;
  const usedAccruedHours = Number(formData.get("used-accrued-hours")) || 0;
  const overtimeHours = Number(formData.get("overtime-hours")) || 0;
  const travelDistanceKM = Number(formData.get("travel-distance")) || 0;
  const extraToolCompensation = Number(formData.get("extra-tool-compensation")) || 0;
  const extraTransportationCompensation = Number(formData.get("extra-transportation-compensation")) || 0;

  if (userId && imageUrl && imageDownloadUrl && uploadDate && weekNumber) {
    const newEntry = await prisma.timesheet.create({
      data: {
        userId,
        imageUrl,
        imageDownloadUrl,
        weekNumber,
        uploadDate,
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
  }
  return;
}



/**
 * Uploads a timesheet image to Vercel-blob-store and timesheet metadata to the database.
 *
 * Accepts a FormData object containing the image file and timesheet metadata.
 * Uploads the image to Vercel Blob Store and saves the metadata to the database.
 * Handles errors and redirects back to the timesheets page on success.
 */
export async function uploadTimesheet(formData: FormData) {
  try {
    const imageFile = formData.get("image") as File;
    const blob = await put(imageFile.name, imageFile, {
      access: "public",
    });
    uploadTimesheetToDb(blob, formData);
  } catch (error: any) {
    console.log(error);
  }
  revalidatePath("/timesheets");
  redirect("/timesheets");
}
