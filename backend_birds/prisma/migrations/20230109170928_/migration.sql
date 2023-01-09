/*
  Warnings:

  - You are about to drop the `BadPilots` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "BadPilots";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "BadPilot" (
    "pilotId" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "created" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    CONSTRAINT "BadPilot_pilotId_fkey" FOREIGN KEY ("pilotId") REFERENCES "Drone" ("serialNumber") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "BadPilot_email_key" ON "BadPilot"("email");
