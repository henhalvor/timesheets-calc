import prisma from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import React from "react";

export default async function UsersImages() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const userId = user ? (user.id as string) : "";

  const images = await prisma.imageMetadata.findMany({
    where: { userId: userId },
    select: {
      imageUrl: true,
      imageWeekNumber: true,
    },
  });

  return (
    <div className="image-gallery flex gap-2 m-4 p-4 bg-gray-500">
      {images.map((image, index) => (
        <div key={index} className="flex flex-col gap-2 items-center">
          <p>Week {image.imageWeekNumber}</p>
          <img
            className="h-auto w-60"
            key={index}
            src={image.imageUrl}
            alt={`Image ${index}`}
          />
        </div>
      ))}
    </div>
  );
}
