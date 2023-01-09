-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pilot" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pilotId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "created" DATETIME NOT NULL,
    "email" TEXT NOT NULL,
    "droneId" INTEGER NOT NULL,
    CONSTRAINT "Pilot_droneId_fkey" FOREIGN KEY ("droneId") REFERENCES "Drone" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Pilot" ("created", "droneId", "email", "firstName", "id", "lastName", "phoneNumber", "pilotId") SELECT "created", "droneId", "email", "firstName", "id", "lastName", "phoneNumber", "pilotId" FROM "Pilot";
DROP TABLE "Pilot";
ALTER TABLE "new_Pilot" RENAME TO "Pilot";
CREATE UNIQUE INDEX "Pilot_pilotId_key" ON "Pilot"("pilotId");
CREATE UNIQUE INDEX "Pilot_droneId_key" ON "Pilot"("droneId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
