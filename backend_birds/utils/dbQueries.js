const { prisma } = require('../prisma/prismaClient')

const saveDrone = async (drone, pilot, distance, closestDist) => {
  const created = await prisma.drone.upsert({
    where: {
      serialNumber: drone.serialNumber._text,
    },
    update: {
      lastSavedAt: new Date(),
      currentDistance: distance,
      closestDistance: closestDist,
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
      currentDistance: distance,
      closestDistance: distance,
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

const saveDevice = async (device) => {
  try {
    await prisma.device.upsert({
      where: {
        deviceId: device._attributes.deviceId,
      },
      update: {
        listenRange: Number(device.listenRange._text),
        uptimeSeconds: Number(device.uptimeSeconds._text),
        updateIntervalMs: Number(device.updateIntervalMs._text),
        deviceStarted: new Date(device.deviceStarted._text),
      },
      create: {
        deviceId: device._attributes.deviceId,
        listenRange: Number(device.listenRange._text),
        uptimeSeconds: Number(device.uptimeSeconds._text),
        updateIntervalMs: Number(device.updateIntervalMs._text),
        deviceStarted: new Date(device.deviceStarted._text),
      },
    })
  } catch (e) {
    console.error(e)
  }
}

// Deleting all drones that were saved more than 10 minutes ago
const deleteDrones = async () => {
  const drones = await prisma.drone.findMany({
    where: {
      lastSavedAt: {
        lt: new Date(now - tenMinutes),
      },
    },
  })
  await prisma.drone.deleteMany({
    where: {
      serialNumber: {
        in: drones.map((d) => d.serialNumber),
      },
    },
  })
}

const findUniqueDrone = async (drone) => {
  const foundDrone = await prisma.drone.findUnique({
    where: {
      serialNumber: drone.serialNumber._text,
    },
  })
  return foundDrone
}

const findNDZDronesWithPilots = async () => {
  const now = new Date()
  const tenMinutes = 60 * 10 * 1000
  const perpetrators = await prisma.drone.findMany({
    where: {
      lastSavedAt: {
        gt: new Date(now - tenMinutes),
      },
      closestDistance: {
        lte: 100000,
      },
    },
    orderBy: {
      lastSavedAt: 'desc',
    },
  })

  const pilots = await prisma.pilot.findMany({})
  const filteredMatchedDrones = perpetrators.map((drone) => ({
    ...drone,
    pilot: pilots.find((p) => p.droneId === drone.id),
  }))

  return filteredMatchedDrones
}

const findDevice = async () => {
  const device = await prisma.device.findFirst({
    orderBy: { lastSavedAt: 'desc' },
  })

  return device
}

module.exports = {
  saveDrone,
  saveDevice,
  deleteDrones,
  findUniqueDrone,
  findNDZDronesWithPilots,
  findDevice,
}
