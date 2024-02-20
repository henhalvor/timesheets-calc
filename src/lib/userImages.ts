import prisma from "@/lib/prisma";
import { getUserId } from "@/lib/user";

export async function getAllUserImages() {
  try {
    const userId = await getUserId();

    const images = await prisma.imageMetadata.findMany({
      where: { userId: userId },
      select: {
        imageUrl: true,
        imageWeekNumber: true,
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
        imageUrl: true,
        imageDownloadUrl: true,
      },
    });

    return image;
  } catch (error) {
    throw error;
  }
}
