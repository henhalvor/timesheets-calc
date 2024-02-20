import { uploadImage } from "@/actions/upload";

export async function ImageForm() {
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
