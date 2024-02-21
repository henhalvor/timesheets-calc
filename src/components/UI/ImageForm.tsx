import { uploadImage } from "@/actions/upload";
import { IoCloudUploadOutline } from "react-icons/io5";
import { LuImagePlus } from "react-icons/lu";

export async function ImageForm() {
  return (
    <div className=" border-solid border-gray-500 border-[1px] rounded-md p-4">
      <form
        action={uploadImage}
        className="flex flex-col gap-5 justify-center items-center"
      >
        <label className="flex items-center gap-2 border-solid border-gray-500 border-[1px] rounded-md p-2 hover:border-black hover:font-semibold hover:scale-105">
          <input type="file" required className=" hidden" />
          <LuImagePlus size={24} />
          Upload Image
        </label>
        <div className="flex flex-col gap-1 items-center">
          <label htmlFor="week-number" className="">
            Week Number
          </label>
          <input
            type="number"
            id="week-number"
            name="week-number"
            required
            className="border-solid border-gray-500 hover:border-black border-[1px] rounded-md p-2 hover:placeholder:text-black hover:scale-105"
            placeholder="Enter week number..."
          />
        </div>
        <button className="flex gap-2 items-center border-solid border-gray-500 hover:border-black hover:font-bold hover:scale-105 border-[1px] rounded-md p-2 font-semibold">
          <IoCloudUploadOutline size={24} />
          Upload
        </button>
      </form>
    </div>
  );
}
