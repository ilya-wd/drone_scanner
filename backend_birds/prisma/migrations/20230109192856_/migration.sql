/*
  Warnings:

  - You are about to drop the `BadPilot` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "BadPilot";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Post";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Pilot" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pilotId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "created" DATETIME NOT NULL,
    "email" TEXT NOT NULL,
    "droneId" INTEGER NOT NULL,
    CONSTRAINT "Pilot_droneId_fkey" FOREIGN KEY ("droneId") REFERENCES "Drone" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Pilot_pilotId_key" ON "Pilot"("pilotId");

-- CreateIndex
CREATE UNIQUE INDEX "Pilot_droneId_key" ON "Pilot"("droneId");
