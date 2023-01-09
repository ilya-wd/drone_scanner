/*
  Warnings:

  - Added the required column `distanceToNest` to the `Drone` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Drone" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "serialNumber" TEXT NOT NULL,
    "manufacturer" TEXT NOT NULL,
    "mac" TEXT NOT NULL,
    "ipv4" TEXT NOT NULL,
    "ipv6" TEXT NOT NULL,
    "firmware" TEXT NOT NULL,
    "positionY" REAL NOT NULL,
    "positionX" REAL NOT NULL,
    "altitude" REAL NOT NULL,
    "lastSavedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "distanceToNest" REAL NOT NULL
);
INSERT INTO "new_Drone" ("altitude", "firmware", "id", "ipv4", "ipv6", "lastSavedAt", "mac", "manufacturer", "positionX", "positionY", "serialNumber") SELECT "altitude", "firmware", "id", "ipv4", "ipv6", "lastSavedAt", "mac", "manufacturer", "positionX", "positionY", "serialNumber" FROM "Drone";
DROP TABLE "Drone";
ALTER TABLE "new_Drone" RENAME TO "Drone";
CREATE UNIQUE INDEX "Drone_serialNumber_key" ON "Drone"("serialNumber");
CREATE TABLE "new_BadPilots" (
    "pilotId" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "created" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    CONSTRAINT "BadPilots_pilotId_fkey" FOREIGN KEY ("pilotId") REFERENCES "Drone" ("serialNumber") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_BadPilots" ("created", "email", "firstName", "lastName", "phoneNumber", "pilotId") SELECT "created", "email", "firstName", "lastName", "phoneNumber", "pilotId" FROM "BadPilots";
DROP TABLE "BadPilots";
ALTER TABLE "new_BadPilots" RENAME TO "BadPilots";
CREATE UNIQUE INDEX "BadPilots_email_key" ON "BadPilots"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
