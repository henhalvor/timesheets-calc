export type TimesheetType = {
  id: string;
  userId: string;
  imageUrl: string;
  imageDownloadUrl: string;
  weekNumber: number;
  uploadDate: bigint;
  regularHours: number;
  accruedHours: number;
  usedAccruedHours: number;
  overtimeHours: number;
  travelDistanceKM: number;
  extraToolCompensation: number;
  extraTransportationCompensation: number;
};

export type DashboardCardData = {
  regularHours: number;
  accruedHoursLeft: number;
  usedAccruedHours: number;
  overtimeHours: number;
  totalHours: number;
  extraToolCompensation: number;
  extraTransportationCompensation: number;
  travelDistanceKM: number;
};

export type DashboardModalData = {
  regularHoursData: { [weekNumber: number]: number; id: string }[];
  accruedHoursLeftData: number[];
  usedAccruedHoursData: { [weekNumber: number]: number; id: string }[];
  overtimeHoursData: { [weekNumber: number]: number; id: string }[];
  totalHoursData: number[];
  travelDistanceKMData: { [weekNumber: number]: number; id: string }[];
  extraToolCompensationData: { [weekNumber: number]: number; id: string }[];
  extraTransportationCompensationData: {
    [weekNumber: number]: number;
    id: string;
  }[];
};
