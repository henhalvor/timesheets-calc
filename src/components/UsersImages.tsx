import { getAllUserImages } from "@/lib/userImages";
import prisma from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import React from "react";
import Image from "next/image";
0
export default async function UsersImages() {
  const images = await getAllUserImages();

  return (
    <div className="image-gallery flex gap-2 m-4 p-4 bg-gray-500">
      {images.map((image, index) => (
        <div key={index} className="flex flex-col gap-2 items-center">
          <p>Week {image.imageWeekNumber}</p>
          <Image
            className="h-auto w-60"
            key={index}
            src={image.imageUrl}
            alt={`Image ${index}`}
            width={600}
            height={1000}
          />
        </div>
      ))}
    </div>
  );
}
