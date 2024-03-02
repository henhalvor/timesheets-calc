import { getDashboardData } from "@/lib/getData";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function Dashboard() {
  const data = await getDashboardData();
  if (!data) {
    return <div>No data</div>;
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
  } = data;

  return (
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
  );
}
