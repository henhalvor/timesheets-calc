-- CreateTable
CREATE TABLE "Timesheet" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "imageDownloadUrl" TEXT NOT NULL,
    "weekNumber" INTEGER NOT NULL,
    "uploadDate" BIGINT NOT NULL,
    "regularHours" DOUBLE PRECISION NOT NULL,
    "accruedHours" DOUBLE PRECISION NOT NULL,
    "usedAccruedHours" DOUBLE PRECISION NOT NULL,
    "overtimeHours" DOUBLE PRECISION NOT NULL,
    "travelDistanceKM" DOUBLE PRECISION NOT NULL,
    "extraToolCompensation" INTEGER NOT NULL,
    "extraTransportationCompensation" INTEGER NOT NULL,

    CONSTRAINT "Timesheet_pkey" PRIMARY KEY ("id")
);
