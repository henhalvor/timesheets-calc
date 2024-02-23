import { getImageById, getImageByWeekNumber } from "@/lib/userImages";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";
import { deleteImageById } from "@/actions/delete";
import ImageIndex from "@/components/ImageIndex";

export default async function Page({ params }: { params: { slug: string } }) {
  const image = await getImageById(params.slug);

  // Check if the image exists
  if (!image) {
    notFound();
  }

  return (
    <div className="h-[330px] w-auto flex flex-col md:flex-row gap-2 items-center justify-center1">
      <div className="border-solid border-gray-500 border-[1px] rounded-md p-1">
        <Image
          className="h-auto w-60"
          src={image.imageUrl}
          alt="Image of timesheet"
          width={600}
          height={1000}
        />
      </div>
      <ImageIndex image={image} />
    </div>
  );
}
