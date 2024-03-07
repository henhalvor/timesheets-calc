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
  modalData: { [weekNumber: number]: number }[] | number[] | null;
  year: string;
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

function DashboardModalContent({ modalData, year }: ModalProps) {
  if (!modalData) return null;
  if (Array.isArray(modalData) && modalData.length === 1) {
    return (
      <p className="relative text-8xl m-auto">
        {modalData[0].toString()}
        <span className="absolute bottom-2 -right-6 text-xl font-light">
          /h
        </span>
      </p>
    );
  }

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
          {modalData.map((weekData, index) => {
            const value = Object.values(weekData)[0];
            if (value === 0 || value === undefined || value === null) {
              return null; // Skip rendering the row if the value is 0, undefined, or null
            }
            return (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {Object.keys(weekData)[0]}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{value}</td>
              </tr>
            );
          })}
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
  year,
}: CardModalProps) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  // const dummyData: { [weekNumber: number]: number }[] = [
  //   { 1: 20 },
  //   { 1: 15 },
  //   { 1: 18 },
  //   { 1: 18 },
  //   { 1: 18 },
  //   { 1: 18 },
  //   { 1: 18 },
  //   { 1: 18 },
  //   { 1: 18 },
  //   { 1: 18 },
  //   { 1: 18 },
  //   { 1: 18 },
  //   { 1: 18 },
  //   // Add more dummy data as needed
  // ];

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
            <DialogTitle>Overview {year}</DialogTitle>
            <DialogDescription>
              See the value to the corresponding week
            </DialogDescription>
          </DialogHeader>
          <DashboardModalContent modalData={modalData} year={year} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <button>
          <DashboardCard
            cardData={cardData}
            cardDataSuffix={cardDataSuffix}
            cardName={cardName}
          />
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Overview {year}</DrawerTitle>
          <DrawerDescription>
          See the value to the corresponding week
          </DrawerDescription>
        </DrawerHeader>
        <DashboardModalContent modalData={modalData} year={year} />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
