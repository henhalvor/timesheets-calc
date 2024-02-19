import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { PutBlobResult } from "@vercel/blob";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "@/lib/prisma";
import { upload } from "@vercel/blob/client";


export async function ImageForm() {
  
  async function uploadImageMetadataToDB(blob: PutBlobResult, formData: FormData) {
    "use server";

    const { getUser } = getKindeServerSession();
    const user = await getUser();

    const userId = user ? user.id : "";
    const imageUrl = blob.url;
    const imageDownloadUrl = blob.downloadUrl;
    const uploadDate = Date.now();
    const imageWeekNumber = Number(formData.get("week-number"));

    if (userId && imageUrl && imageDownloadUrl && uploadDate && imageWeekNumber) {

      const newEntry = await prisma.imageMetadata.create({
        data: {
          userId,
          imageUrl,
          imageDownloadUrl,
          imageWeekNumber,
          uploadDate,
        },
      })
      console.log(newEntry);
    }
    return;
  }

  async function uploadImage(formData: FormData) {
    'use server';
    const imageFile = formData.get('image') as File;
    const blob = await put(imageFile.name, imageFile, {
      access: 'public',
    });
    uploadImageMetadataToDB(blob, formData);
    revalidatePath('/');
    return blob;
  }


  return (
    <form action={uploadImage}>
      <label htmlFor="image">Image</label>
      <input type="file" id="image" name="image" required />
      <label htmlFor="week-number">Week Number</label>
      <input type="number" id="week-number" name="week-number" required />
      <button>Upload</button>
    </form>
  );
}
