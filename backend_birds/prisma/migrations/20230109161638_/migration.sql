/*
  Warnings:

  - The primary key for the `BadPilots` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `BadPilots` table. All the data in the column will be lost.
  - Added the required column `pilotId` to the `BadPilots` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_BadPilots" (
    "pilotId" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "created" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    CONSTRAINT "BadPilots_email_fkey" FOREIGN KEY ("email") REFERENCES "Drone" ("serialNumber") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_BadPilots" ("created", "email", "firstName", "lastName", "phoneNumber") SELECT "created", "email", "firstName", "lastName", "phoneNumber" FROM "BadPilots";
DROP TABLE "BadPilots";
ALTER TABLE "new_BadPilots" RENAME TO "BadPilots";
CREATE UNIQUE INDEX "BadPilots_email_key" ON "BadPilots"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
