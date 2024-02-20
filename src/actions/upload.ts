"use server";

import { revalidatePath } from "next/cache";
import { put, PutBlobResult } from "@vercel/blob";
import prisma from "@/lib/prisma";
import { getUserId } from "@/lib/user";
import { redirect } from "next/navigation";

async function uploadImageMetadataToDB(
  blob: PutBlobResult,
  formData: FormData
) {
  const userId = await getUserId();
  const imageUrl = blob.url;
  const imageDownloadUrl = blob.downloadUrl;
  const uploadDate = Date.now();
  const imageWeekNumber = Number(formData.get("week-number"));

  if (userId && imageUrl && imageDownloadUrl && uploadDate && imageWeekNumber) {
    const newEntry = await prisma.imageMetadata.create({
      data: {
        userId,
        imageUrl,
        imageDownloadUrl,
        imageWeekNumber,
        uploadDate,
      },
    });
    console.log(newEntry);
  }
  return;
}

export async function uploadImage(formData: FormData) {
  try {
    const imageFile = formData.get("image") as File;
    const blob = await put(imageFile.name, imageFile, {
      access: "public",
    });
    uploadImageMetadataToDB(blob, formData);
  } catch (error: any) {
    console.log(error);
  }
  revalidatePath("/timesheets");
  redirect("/timesheets");
}
