import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DashboardModalData } from "@/types";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/lib/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

type CardProps = {
  cardData: number;
  cardDataSuffix: string;
};

type CardModalProps = {
  cardData: number;
  cardDataSuffix: string;
  modalData: DashboardModalData | null;
};

function DashboardCard({ cardData, cardDataSuffix }: CardProps) {
  return (
    <Card className="relative flex flex-col  justify-center items-center w-[180px] h-[180px]">
      <CardDescription className="absolute top-2 left-auto right-auto">
        Regular hours
      </CardDescription>
      <p className="relative text-5xl font-bold text-center">
        {cardData}
        <span className="absolute bottom-0 -right-6 text-lg font-light">
          {cardDataSuffix}
        </span>
      </p>
    </Card>
  );
}

function DashboardModalContent() {}

export default function DashboardCardAndModal({
  cardData,
  cardDataSuffix,
  modalData,
}: CardModalProps) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button>
            <DashboardCard cardData={cardData} cardDataSuffix={cardDataSuffix} />
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when youre done.
            </DialogDescription>
          </DialogHeader>
          {/* content */}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <button>
          <DashboardCard cardData={cardData} cardDataSuffix={cardDataSuffix}/>
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit profile</DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here. Click save when youre done.
          </DrawerDescription>
        </DrawerHeader>
        {/* content */}
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
