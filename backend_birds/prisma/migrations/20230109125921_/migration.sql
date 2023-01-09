/*
  Warnings:

  - You are about to alter the column `altitude` on the `Drone` table. The data in that column could be lost. The data in that column will be cast from `String` to `Float`.
  - You are about to alter the column `positionX` on the `Drone` table. The data in that column could be lost. The data in that column will be cast from `String` to `Float`.
  - You are about to alter the column `positionY` on the `Drone` table. The data in that column could be lost. The data in that column will be cast from `String` to `Float`.

*/
-- CreateTable
CREATE TABLE "BadPilots" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "created" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    CONSTRAINT "BadPilots_email_fkey" FOREIGN KEY ("email") REFERENCES "Drone" ("serialNumber") ON DELETE RESTRICT ON UPDATE CASCADE
);

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
    "lastSavedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Drone" ("altitude", "firmware", "id", "ipv4", "ipv6", "mac", "manufacturer", "positionX", "positionY", "serialNumber") SELECT "altitude", "firmware", "id", "ipv4", "ipv6", "mac", "manufacturer", "positionX", "positionY", "serialNumber" FROM "Drone";
DROP TABLE "Drone";
ALTER TABLE "new_Drone" RENAME TO "Drone";
CREATE UNIQUE INDEX "Drone_serialNumber_key" ON "Drone"("serialNumber");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "BadPilots_email_key" ON "BadPilots"("email");
