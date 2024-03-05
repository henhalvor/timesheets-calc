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
  uploadDate: bigint;
  regularHours: number;
  accruedHours: number;
  usedAccruedHours: number;
  overtimeHours: number;
  travelDistanceKM: number;
  extraToolCompensation: number;
  extraTransportationCompensation: number;
}[];
