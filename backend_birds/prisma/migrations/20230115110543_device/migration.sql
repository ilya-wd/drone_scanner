-- CreateTable
CREATE TABLE "Device" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "deviceId" TEXT NOT NULL,
    "listenRange" INTEGER NOT NULL,
    "deviceStarted" DATETIME NOT NULL,
    "lastSavedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "uptimeSeconds" INTEGER NOT NULL,
    "updateIntervalMs" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Device_deviceId_key" ON "Device"("deviceId");
