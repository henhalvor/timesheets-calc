import { getImageByWeekNumber } from "@/lib/userImages";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";

export default async function Page({ params }: { params: { slug: string } }) {
  const image = await getImageByWeekNumber(Number(params.slug));

  // Check if the image exists
  if (!image) {
    notFound();
  }

  return (
    <div>
      <Image
        className="h-auto w-60"
        src={image.imageUrl}
        alt="Image of timesheet"
        width={600}
        height={1000}
      />
    </div>
  );
}
