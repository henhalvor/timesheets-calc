"use server";

import { revalidatePath } from "next/cache";
import { put, PutBlobResult } from "@vercel/blob";
import prisma from "@/lib/prisma";
import { getUserId } from "@/lib/user";
import { redirect } from "next/navigation";

async function optimizeImage(file: File): Promise<File> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target) {
        const image = new Image();
        image.src = event.target.result as string;
        image.onload = () => {
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          if (!context) {
            reject(new Error("Canvas context is null"));
            return;
          }
          const maxWidth = 800; // Adjust the maximum width as needed
          const maxHeight = 600; // Adjust the maximum height as needed
          let width = image.width;
          let height = image.height;

          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;
          context.drawImage(image, 0, 0, width, height);

          canvas.toBlob((blob) => {
            if (!blob) {
              reject(new Error("Failed to create Blob"));
              return;
            }
            const optimizedFile = new File([blob], file.name, {
              type: "image/jpeg",
              lastModified: Date.now(),
            });
            resolve(optimizedFile);
          }, "image/jpeg", 0.9); // Adjust the quality (0.9 is 90% quality)
        };
        image.onerror = (error) => reject(error);
      } else {
        reject(new Error("Event target is null"));
      }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}


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
    const optimizedImageFile = await optimizeImage(imageFile); // Optimize the image
    const blob = await put(optimizedImageFile.name, optimizedImageFile, {
      access: "public",
    });
    uploadTimesheetToDb(blob, formData);
  } catch (error: any) {
    console.log(error);
  }
  revalidatePath("/timesheets");
  redirect("/timesheets");
}
