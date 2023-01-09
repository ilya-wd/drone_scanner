/*
  Warnings:

  - The primary key for the `BadPilot` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `id` to the `BadPilot` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_BadPilot" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pilotId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "created" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    CONSTRAINT "BadPilot_pilotId_fkey" FOREIGN KEY ("pilotId") REFERENCES "Drone" ("serialNumber") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_BadPilot" ("created", "email", "firstName", "lastName", "phoneNumber", "pilotId") SELECT "created", "email", "firstName", "lastName", "phoneNumber", "pilotId" FROM "BadPilot";
DROP TABLE "BadPilot";
ALTER TABLE "new_BadPilot" RENAME TO "BadPilot";
CREATE UNIQUE INDEX "BadPilot_pilotId_key" ON "BadPilot"("pilotId");
CREATE UNIQUE INDEX "BadPilot_email_key" ON "BadPilot"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
