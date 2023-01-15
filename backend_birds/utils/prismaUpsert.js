const { prisma } = require('../prisma/prismaClient')
const { calculateDistance } = require('./drone_helper.js')

const prismaUpsert = async (drone, pilot) => {
  const created = await prisma.drone.upsert({
    where: {
      serialNumber: drone.serialNumber._text,
    },
    update: {
      lastSavedAt: new Date(),
      currentDistance: calculateDistance(drone),
      closestDistance:
        calculateDistance(drone) < drone.closestDistance
          ? calculateDistance(drone)
          : drone.closestDistance,
    },
    create: {
      serialNumber: drone.serialNumber._text,
      manufacturer: drone.manufacturer._text,
      mac: drone.mac._text,
      ipv4: drone.ipv4._text,
      ipv6: drone.ipv6._text,
      firmware: drone.firmware._text,
      positionY: Number(drone.positionY._text),
      positionX: Number(drone.positionX._text),
      altitude: Number(drone.altitude._text),
      currentDistance: calculateDistance(drone),
      closestDistance: calculateDistance(drone),
      pilot: pilot
        ? {
            create: {
              pilotId: pilot.data.pilotId,
              firstName: pilot.data.firstName,
              lastName: pilot.data.lastName,
              phoneNumber: pilot.data.phoneNumber,
              created: pilot.data.createdDt,
              email: pilot.data.email,
            },
          }
        : undefined,
    },
  })
  created
}

module.exports = { prismaUpsert }
