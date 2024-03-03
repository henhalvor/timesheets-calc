"use client"

import React, { ChangeEvent, useState } from "react";
import { LuImagePlus } from "react-icons/lu";

export default function FileInput() {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileName(file ? file.name : "");
  };

  return (
    <label className={`${fileName ? "text-xs text-wrap" : "text-base"} cursor-pointer bg-primary text-primary-foreground flex items-center gap-2 border-solid border-border border-[1px] w-[232.5px] md:w-auto rounded-md p-2 font-semibold hover:scale-105`}>
      <input
        type="file"
        id="image"
        name="image"
        required
        className="hidden"
        onChange={handleFileChange}
      />
      <LuImagePlus size={24} className="mr-6 md:mr-0" />
      {fileName ? fileName : "Upload Image"}
    </label>
  );
}
