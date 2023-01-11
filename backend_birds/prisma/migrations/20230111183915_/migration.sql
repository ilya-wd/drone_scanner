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
    "firstSavedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastSavedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "currentDistance" REAL NOT NULL,
    "closestDistance" REAL NOT NULL
);
INSERT INTO "new_Drone" ("altitude", "closestDistance", "currentDistance", "firmware", "id", "ipv4", "ipv6", "lastSavedAt", "mac", "manufacturer", "positionX", "positionY", "serialNumber") SELECT "altitude", "closestDistance", "currentDistance", "firmware", "id", "ipv4", "ipv6", "lastSavedAt", "mac", "manufacturer", "positionX", "positionY", "serialNumber" FROM "Drone";
DROP TABLE "Drone";
ALTER TABLE "new_Drone" RENAME TO "Drone";
CREATE UNIQUE INDEX "Drone_serialNumber_key" ON "Drone"("serialNumber");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
