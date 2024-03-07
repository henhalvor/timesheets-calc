"use client";

import {
  getDashboardCardData,
  getDashboardModalData,
} from "@/actions/getData";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getListedYears } from "@/lib/utils";
import { DashboardCardData, DashboardModalData } from "@/types";
import DashboardCardAndModal from "@/components/dashboard-card";

export default function Dashboard() {
  const [dashboardCardData, setDashboardCardData] =
    useState<DashboardCardData | null>(null); // State to store dashboard data

  const [dashboardModalData, setDashboardModalData] =
    useState<DashboardModalData | null>(null);

  const [loading, setLoading] = useState(true); // State to manage loading state

  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString()
  ); // set to current year

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const modalData = await getDashboardModalData(Number(selectedYear));
        if (!modalData) {
          throw new Error("No dashboardModalData found");
        }
        setDashboardModalData(modalData);

        const cardData = await getDashboardCardData(Number(selectedYear)); // Assuming 2024 is the default year
        if (!cardData) {
          throw new Error("No dashboardCardData found");
        }
        setDashboardCardData(cardData);
        setLoading(false); // Once data is fetched, set loading to false
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setLoading(false); // If there's an error, set loading to false'
        setDashboardCardData(null); // Set dashboardCardData to null in case of error
        setDashboardModalData(null);
      }
    };

    fetchData(); // Call the asynchronous function
  }, [selectedYear]);

  if (loading) {
    return (
      <div>
        <div className="flex justify-center">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={selectedYear} />
            </SelectTrigger>
          </Select>
        </div>
        <div className="max-w-[800px] flex flex-row flex-wrap gap-4 items-center justify-center p-4">
          {Array.from({ length: 8 }, (_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  const listedYears = getListedYears(10);

  if (!dashboardCardData || !dashboardModalData) {
    return (
      <div className="flex flex-col items-center">
        <div className="flex justify-center mt-8 mb-4">
        <Select value={selectedYear} onValueChange={setSelectedYear}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent>
            {listedYears.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <p className="">No Data For This Year</p>
      </div>
    ); // Render no data message if data is not available
  }

  const {
    regularHours,
    accruedHoursLeft,
    usedAccruedHours,
    overtimeHours,
    totalHours,
    extraToolCompensation,
    extraTransportationCompensation,
    travelDistanceKM,
  } = dashboardCardData;

  const {
    regularHoursData,
    accruedHoursLeftData,
    usedAccruedHoursData,
    overtimeHoursData,
    totalHoursData,
    travelDistanceKMData,
    extraToolCompensationData,
    extraTransportationCompensationData,
  } = dashboardModalData;

  

  return (
    <div>
      <div className="flex justify-center mt-8 mb-4">
        <Select value={selectedYear} onValueChange={setSelectedYear}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent>
            {listedYears.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="max-w-[800px] flex flex-row flex-wrap gap-4 items-center justify-center p-4">
        <DashboardCardAndModal
          cardData={regularHours}
          cardDataSuffix={"/h"}
          modalData={regularHoursData}
          cardName="Regular Hours"
          year={selectedYear}
        />
        <DashboardCardAndModal
          cardData={accruedHoursLeft}
          cardDataSuffix={"/h"}
          modalData={accruedHoursLeftData}
          cardName="Accrued Hours Left"
          year={selectedYear}
        />
        <DashboardCardAndModal
          cardData={usedAccruedHours}
          cardDataSuffix={"/h"}
          modalData={usedAccruedHoursData}
          cardName="Used Accrued Hours"
          year={selectedYear}
        />
        <DashboardCardAndModal
          cardData={overtimeHours}
          cardDataSuffix={"/h"}
          modalData={overtimeHoursData}
          cardName="Overtime Hours"
          year={selectedYear}
        />
        <DashboardCardAndModal
          cardData={totalHours}
          cardDataSuffix={"/h"}
          modalData={totalHoursData}
          cardName="Total Hours"
          year={selectedYear}
        />
        <DashboardCardAndModal
          cardData={extraToolCompensation}
          cardDataSuffix={"kr"}
          modalData={extraToolCompensationData}
          cardName="Tool Compensation"
          year={selectedYear}
        />
        <DashboardCardAndModal
          cardData={extraTransportationCompensation}
          cardDataSuffix={"kr"}
          modalData={extraTransportationCompensationData}
          cardName="Transport Compensation"
          year={selectedYear}
        />
        <DashboardCardAndModal
          cardData={travelDistanceKM}
          cardDataSuffix={"km"}
          modalData={travelDistanceKMData}
          cardName="Total Travel"
          year={selectedYear}
        />
      </div>
    </div>
  );
}

function CardSkeleton() {
  return (
    <Card className="relative bg-muted opacity-60 flex flex-col justify-center items-center w-[180px] h-[180px]">
      <CardDescription className="absolute top-auto bottom-auto left-auto right-auto">
        Loading...
      </CardDescription>
      {/* Additional skeleton content if needed */}
    </Card>
  );
}
