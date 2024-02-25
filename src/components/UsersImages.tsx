"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { useRouter } from "next/navigation";
import { ImageType } from "@/types";



interface UsersImagesProps {
  images: ImageType[] | null;
}

export default function UsersImages({ images }: UsersImagesProps) {
  if (!images) {
    notFound();
  }

  const router = useRouter();

  return (
    <div className="image-gallery flex flex-col sm:flex-row sm:flex-wrap gap-3 m-4 p-4">
      {images.map((image, index) => (
        <div
          key={index}
          className="flex flex-col gap-2 items-center hover:cursor-pointer hover:scale-105 rounded-md bg-gray-500 border-solid border-gray-500 border-[1px] p-1"
          onClick={() => {
            router.push(`/timesheets/${image.id}`);
          }}
        >
          <p>Week {image.weekNumber}</p>
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
