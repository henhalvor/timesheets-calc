"use client";


import { getDashboardData } from "@/actions/getData";
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

type DashboardData = {
  regularHours: number;
  accruedHoursLeft: number;
  usedAccruedHours: number;
  overtimeHours: number;
  totalHours: number;
  extraToolCompensation: number;
  extraTransportationCompensation: number;
  travelDistanceKM: number;
};

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  ); // State to store dashboard data
  const [loading, setLoading] = useState(true); // State to manage loading state

  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString()
  ); // set to current year

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getDashboardData(Number(selectedYear)); // Assuming 2024 is the default year
        if (!data) {
          throw new Error("No DashboardData found");
        }
        setDashboardData(data);
        setLoading(false); // Once data is fetched, set loading to false
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setLoading(false); // If there's an error, set loading to false'
        setDashboardData(null); // Set dashboardData to null in case of error
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

  if (!dashboardData) {
    return <div>No data</div>; // Render no data message if data is not available
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
  } = dashboardData;

  const listedYears = getListedYears();

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
        <Card className="relative flex flex-col  justify-center items-center w-[180px] h-[180px]">
          <CardDescription className="absolute top-2 left-auto right-auto">
            Regular hours
          </CardDescription>
          <p className="relative text-5xl font-bold text-center">
            {regularHours}
            <span className="absolute bottom-0 -right-5 text-lg font-light">
              /h
            </span>
          </p>
        </Card>
        <Card className="relative flex flex-col justify-center items-center w-[180px] h-[180px]">
          <CardDescription className="absolute top-2 left-auto right-auto">
            Accrued hours left
          </CardDescription>
          <p className="relative text-5xl font-bold text-center">
            {accruedHoursLeft}
            <span className="absolute bottom-0 -right-5 text-lg font-light">
              /h
            </span>
          </p>
        </Card>
        <Card className="relative flex flex-col justify-center items-center w-[180px] h-[180px]">
          <CardDescription className="absolute top-2 left-auto right-auto">
            Accrued hours used
          </CardDescription>
          <p className="relative text-5xl font-bold text-center">
            {usedAccruedHours}
            <span className="absolute bottom-0 -right-5 text-lg font-light">
              /h
            </span>
          </p>
        </Card>
        <Card className="relative flex flex-col justify-center items-center w-[180px] h-[180px]">
          <CardDescription className="absolute top-2 left-auto right-auto">
            Overtime hours
          </CardDescription>
          <p className="relative text-5xl font-bold text-center">
            {overtimeHours}
            <span className="absolute bottom-0 -right-5 text-lg font-light">
              /h
            </span>
          </p>
        </Card>
        <Card className="relative flex flex-col justify-center items-center w-[180px] h-[180px]">
          <CardDescription className="absolute top-2 left-auto right-auto">
            Total hours
          </CardDescription>
          <p className="relative text-5xl font-bold text-center">
            {totalHours}
            <span className="absolute bottom-0 -right-5 text-lg font-light">
              /h
            </span>
          </p>
        </Card>
        <Card className="relative flex flex-col justify-center items-center w-[180px] h-[180px]">
          <CardDescription className="absolute top-2 left-auto right-auto">
            Tool Compensation
          </CardDescription>
          <p className="relative text-5xl font-bold text-center">
            {extraToolCompensation}
            <span className="absolute bottom-0 -right-5 text-lg font-light">
              kr
            </span>
          </p>
        </Card>
        <Card className="relative flex flex-col justify-center items-center w-[180px] h-[180px]">
          <CardDescription className=" text-center break-words max-w-[170px] absolute top-2 left-auto right-auto">
            Transport Compensation
          </CardDescription>
          <p className="relative text-5xl font-bold text-center">
            {extraTransportationCompensation}
            <span className="absolute bottom-0 -right-5 text-lg font-light">
              kr
            </span>
          </p>
        </Card>
        <Card className="relative flex flex-col justify-center items-center w-[180px] h-[180px]">
          <CardDescription className=" text-center break-words max-w-[170px] absolute top-2 left-auto right-auto">
            Travel Distance
          </CardDescription>
          <p className="relative text-5xl font-bold text-center">
            {travelDistanceKM}
            <span className="absolute bottom-0 -right-[26px] text-lg font-light">
              km
            </span>
          </p>
        </Card>
      </div>
    </div>
  );
}

function getListedYears() {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = currentYear; i >= currentYear - 9; i--) {
    years.push(i);
  }
  return years;
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
