"use server";

import prisma from "@/lib/prisma";
import { del } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteTimesheetById(formdata: FormData) {
  try {
    const id = formdata.get("id") as string;

    // Get url for image
    const image = await prisma.timesheet.findFirst({
      where: { id: id },
      select: {
        imageUrl: true,
      },
    });
    if (!image) {
      return;
    }

    // Delete form postgresDb
    await prisma.timesheet.delete({
      where: { id: id },
    });

    // Delete form blob store
    await del(image.imageUrl);

    console.log("Timesheet deleted. Id: " + id);
  } catch (error: any) {
    console.log(error);
  }

  revalidatePath("/timesheets");
  redirect("/timesheets");
}
