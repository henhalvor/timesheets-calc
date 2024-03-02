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
  /* <Button variant={"destructive"} className="text-xl font-bold">
        <ToastedButton
          name="test-btn"
          title="test toast"
          description="testing toast"
        />
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
      {name}
    </button>
  );
};

export default ToastedButton;
