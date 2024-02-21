import {
  getImageById,
  getImageByWeekNumber,
} from "@/lib/userImages";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";
import { deleteImageById } from "@/actions/delete";

export default async function Page({ params }: { params: { slug: string } }) {
  const image = await getImageById(params.slug);

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
      <div>
        
        <form action={deleteImageById}>
          <label >Image Id</label>
          <input type="text" id="id" name="id" value={image.id} readOnly />
          <button>Delete Image</button>
        </form>
      </div>
    </div>
  );
}
