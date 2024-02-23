import prisma from "@/lib/prisma";
import { getUserId } from "@/lib/user";
import { del } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getAllUserImages() {
  try {
    const userId = await getUserId();

    const images = await prisma.imageMetadata.findMany({
      where: { userId: userId },
      select: {
        userId: true,
        imageUrl: true,
        imageDownloadUrl: true,
        id: true,
        imageWeekNumber: true,
        uploadDate: true,
      },
    });

    return images;
  } catch (error) {
    throw error;
  }
}

export async function getImageByWeekNumber(weekNumber: number) {
  try {
    const userId = await getUserId();

    const image = await prisma.imageMetadata.findFirst({
      where: { userId: userId, imageWeekNumber: weekNumber },
      select: {
        userId: true,
        imageUrl: true,
        imageDownloadUrl: true,
        id: true,
        imageWeekNumber: true,
        uploadDate: true,
      },
    });

    return image;
  } catch (error) {
    throw error;
  }
}

export async function getImageById(id: string) {
  try {
    const userId = await getUserId();

    const image = await prisma.imageMetadata.findFirst({
      where: { userId: userId, id: id },
      select: {
        userId: true,
        imageUrl: true,
        imageDownloadUrl: true,
        id: true,
        imageWeekNumber: true,
        uploadDate: true,
      },
    });

    return image;
  } catch (error) {
    throw error;
  }
}


