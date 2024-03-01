"use client"

import React, { ButtonHTMLAttributes } from 'react';
import { useToast } from '@/components/ui/use-toast';

interface ToastedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  name: string // Button name
  title: string; // Title for the toast
  description: string; // Description for the toast
}

const ToastedButton: React.FC<ToastedButtonProps> = ({ name, title, description, ...rest }) => {
  const { toast } = useToast();

  const handleButtonClick = () => {
    toast({
      title,
      description,
    });
  };

  return (
    <button onClick={handleButtonClick} className="bg-primary text-primary-foreground hover:bg-primary/90 " {...rest}>
      {name}
    </button>
  );
};

export default ToastedButton;
