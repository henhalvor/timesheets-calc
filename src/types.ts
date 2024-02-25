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
