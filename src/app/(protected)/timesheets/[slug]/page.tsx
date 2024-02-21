import { getImageById, getImageByWeekNumber } from "@/lib/userImages";
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
    <div className="w-full h-full flex flex-col gap-2 items-center justify-center">
      <div className="border-solid border-gray-500 border-[1px] rounded-md p-1">
        <Image
          className="h-auto w-60"
          src={image.imageUrl}
          alt="Image of timesheet"
          width={600}
          height={1000}
        />
      </div>
      <div>
        <form action={deleteImageById}>
          <label className="hidden">Image Id</label>
          <input
            type="text"
            id="id"
            name="id"
            value={image.id}
            readOnly
            className="hidden"
          />
          <button className=" text-black border-solid border-gray-500 border-[1px] rounded-md p-2 hover:border-black hover:font-semibold hover:scale-105 m-2">
            Delete Image
          </button>
        </form>
      </div>
    </div>
  );
}
