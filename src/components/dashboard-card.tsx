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
  cardName: string;
};

type ModalProps = {
  modalData: Number[] | null;
};

type CardModalProps = CardProps & ModalProps;

function DashboardCard({ cardData, cardDataSuffix, cardName }: CardProps) {
  return (
    <Card className="relative flex flex-col  justify-center items-center w-[180px] h-[180px] hover:scale-105">
      <CardDescription className="absolute top-2 left-auto right-auto">
        {cardName}
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

function DashboardModalContent({ modalData }: ModalProps) {
  if (!modalData) return;
  modalData.push(1, 2, 3, 4, 5, 6, 7, 8, 8, 9);
  return (
    <div className="max-h-96 overflow-y-auto border-border border-solid  border-[1px] rounded-md">
      {" "}
      {/* Set maximum height and enable vertical scrolling */}
      <table className="min-w-full divide-y divide-border ">
        <thead className="">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Week
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Hours
            </th>
          </tr>
        </thead>
        <tbody className=" divide-y divide-border">
          {modalData.map((number, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">{index}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {number.toString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function DashboardCardAndModal({
  cardData,
  cardDataSuffix,
  cardName,
  modalData,
}: CardModalProps) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button>
            <DashboardCard
              cardData={cardData}
              cardDataSuffix={cardDataSuffix}
              cardName={cardName}
            />
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when youre done.
            </DialogDescription>
          </DialogHeader>
          <DashboardModalContent modalData={modalData} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <button>
          <DashboardCard cardData={cardData} cardDataSuffix={cardDataSuffix} cardName={cardName} />
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
