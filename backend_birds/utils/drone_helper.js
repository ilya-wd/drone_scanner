const axios = require('axios')
const convert = require('xml-js')
const { prisma } = require('../prisma/prismaClient')
const { prismaUpsert } = require('./prismaUpsert')

const filterPosition = (drone, insideNDZ) => {
  const distance = calculateDistance(drone)
  return insideNDZ ? distance < 100000 : distance > 100000
}

const calculateDistance = (drone) => {
  const [droneY, droneX] = [Number(drone.positionY._text), Number(drone.positionX._text)]
  const distance = Math.sqrt(Math.pow(droneY - 250000, 2) + Math.pow(droneX - 250000, 2))
  return distance
}

const fetchPilot = async (serialNumber) => {
  let pilot = undefined
  try {
    pilot = await axios.get(`https://assignments.reaktor.com/birdnest/pilots/${serialNumber}`)
  } catch (e) {
    console.error(e)
  }
  return pilot
}

const saveDrones = async (drones, violated) => {
  for (const drone of drones) {
    const foundDrone = await prisma.drone.findUnique({
      where: {
        serialNumber: drone.serialNumber._text,
      },
    })

    // if pilot(drone.serialNumber) found
    const pilot = await fetchPilot(drone.serialNumber._text)

    const distance = calculateDistance(drone)
    let closestDist = distance

    if (foundDrone && closestDist > foundDrone.closestDistance) {
      closestDist = foundDrone.closestDistance
    }
    try {
      await prisma.drone.upsert({
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
    } catch (e) {
      console.error(e)
    }
  }
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

const sleep = (seconds) => new Promise((resolve) => setTimeout(resolve, seconds * 1000))

const droneScan = () => {
  axios
    .get('https://assignments.reaktor.com/birdnest/drones')
    .then((data) => parseXml(data))
    .then((parsedData) => {
      saveDrones(parsedData[0], true)
      saveDevice(parsedData[2])
    })
    .catch((error) => {
      console.error(error)
      sleep(5)
    })
}

const parseXml = (drones) => {
  const parsedData = JSON.parse(convert.xml2json(drones.data, { compact: true, spaces: 2 }))
  const dronesInside = parsedData.report.capture.drone.filter((x) => filterPosition(x, true))
  const droneOutside = parsedData.report.capture.drone.filter((x) => filterPosition(x, false))
  const deviceInfo = parsedData.report.deviceInformation
  return [dronesInside, droneOutside, deviceInfo]
}

module.exports = {
  filterPosition,
  saveDevice,
  saveDrones,
  deleteDrones,
  sleep,
  droneScan,
  parseXml,
  calculateDistance,
}
