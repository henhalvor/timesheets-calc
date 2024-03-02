import { uploadTimesheet } from "@/actions/upload";
import { IoCloudUploadOutline } from "react-icons/io5";
import { LuImagePlus } from "react-icons/lu";
import { Button } from "./ui/button";
import ToastedButton from "./toasted-button";

export async function ImageForm() {
  return (
    <form
      action={uploadTimesheet}
      className="flex flex-col max-w-[600px] gap-5 items-center border-solid border-border border-[1px] rounded-md p-4"
    >
      <label className="bg-primary text-primary-foreground flex items-center gap-2 border-solid border-border border-[1px] rounded-md p-2 font-semibold hover:scale-105">
        <input
          type="file"
          id="image"
          name="image"
          required
          className="hidden"
        />
        <LuImagePlus size={24} className="" />
        Upload Image
      </label>
      <div className="flex flex-col md:flex-row md:flex-wrap md:justify-evenly items-center justify-center gap-2">
        <div className="flex flex-col gap-1">
          <label htmlFor="week-number" className="">
            Week Number
          </label>
          <input
            type="number"
            id="week-number"
            name="week-number"
            required
            className="bg-input   border-solid border-border  border-[1px] rounded-md p-2 hover:scale-105 placeholder:text-xs"
            placeholder="Enter week number..."
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="hours" className="">
            Hours
          </label>
          <input
            type="number"
            step={0.5}
            id="hours"
            name="hours"
            required
            className="bg-input   border-solid border-border  border-[1px] rounded-md p-2 hover:scale-105 placeholder:text-xs"
            placeholder="Enter number of hours..."
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="accrued-hours" className="">
            Accrued Hours
          </label>
          <input
            type="number"
            step={0.5}
            id="accrued-hours"
            name="accrued-hours"
            className="bg-input   border-solid border-border  border-[1px] rounded-md p-2 hover:scale-105 placeholder:text-xs"
            placeholder="Enter number of accrued Hours..."
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="used-accrued-hours" className="">
            Used Accrued Hours
          </label>
          <input
            type="number"
            step={0.5}
            id="used-accrued-hours"
            name="used-accrued-hours"
            className="bg-input   border-solid border-border  border-[1px] rounded-md p-2 hover:scale-105 placeholder:text-xs"
            placeholder="Enter number of used accrued Hours..."
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="overtime-hours" className="">
            Overtime Hours
          </label>
          <input
            type="number"
            step={0.5}
            id="overtime-hours"
            name="overtime-hours"
            className="bg-input   border-solid border-border  border-[1px] rounded-md p-2 hover:scale-105 placeholder:text-xs"
            placeholder="Enter number of Overtime Hours..."
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="travel-distance" className="">
            Travel Distance KM
          </label>
          <input
            type="number"
            step={0.1}
            id="travel-distance"
            name="travel-distance"
            className="bg-input   border-solid border-border  border-[1px] rounded-md p-2 hover:scale-105 placeholder:text-xs"
            placeholder="Enter travel distance in KM..."
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="extra-tool-compensation" className="">
            Tool Compensation
          </label>
          <input
            type="number"
            id="extra-tool-compensation"
            name="extra-tool-compensation"
            className="bg-input   border-solid border-border  border-[1px] rounded-md p-2 hover:scale-105 placeholder:text-xs"
            placeholder="Enter amount of tool compensation..."
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="extra-transportation-compensation" className="">
            Transport Compensation
          </label>
          <input
            type="number"
            id="extra-transportation-compensation"
            name="extra-transportation-compensation"
            className="bg-input   border-solid border-border  border-[1px] rounded-md p-2 hover:scale-105 placeholder:text-xs"
            placeholder="Enter amount of transport compensation..."
          />
        </div>
      </div>
      <Button
        variant={"default"}
        className=" h-[42px] w-24 m-0 p-0 border-solid border-border hover:scale-105 border-[1px] rounded-md font-semibold"
      >
        <ToastedButton
          title="Upload"
          description="Successfully uploaded timesheet"
          className="w-full h-full flex items-center justify-center gap-2"
        >
          <IoCloudUploadOutline size={24} className="" />
          Upload
        </ToastedButton>
      </Button>
    </form>
  );
}
