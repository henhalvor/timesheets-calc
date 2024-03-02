"use client";

import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { useToast } from "@/components/ui/use-toast";

interface ToastedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string; // Title for the toast
  description: string; // Description for the toast
  children?: ReactNode; // Children elements
}

// Unstyled button which wraps a child button.
// Example:
{
  /* <Button
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
      </Button> */
}

const ToastedButton: React.FC<ToastedButtonProps> = ({
  title,
  description,
  children,
  ...rest
}) => {
  const { toast } = useToast();

  const handleButtonClick = () => {
    toast({
      title,
      description,
    });
  };

  return (
    <button onClick={handleButtonClick} {...rest}>
      {children}
    </button>
  );
};

export default ToastedButton;
