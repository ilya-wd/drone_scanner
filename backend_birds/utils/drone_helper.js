const axios = require('axios')
const convert = require('xml-js')
const { prisma } = require('../prisma/prismaClient')
const { prismaUpsert } = require('./prismaUpsert')

const filterPosition = (drone, insideNDZ) => {
  const distance = calculateDistance(drone)
  console.log(insideNDZ ? distance < 100000 : distance > 100000, distance)
  return insideNDZ ? distance < 100000 : distance > 100000
}

const calculateDistance = (drone) => {
  const [droneY, droneX] = [Number(drone.positionY._text), Number(drone.positionX._text)]
  const distance = Math.sqrt(Math.pow(droneY - 250000, 2) + Math.pow(droneX - 250000, 2))
  return distance
}

const saveDrones = async (drones, violated) => {
  for await (const drone of drones) {
    let pilot = undefined
    if (violated) {
      try {
        pilot = await axios.get(
          `https://assignments.reaktor.com/birdnest/pilots/${drone.serialNumber._text}`
        )
      } catch (e) {
        console.warn('PILOT ERROR PILOT ERROR PILOT ERROR PILOT ERROR')
        console.error(e)
        console.warn('PILOT ERROR PILOT ERROR PILOT ERROR PILOT ERROR')
      }
    }

    try {
      // prismaUpsert(drone, pilot)
      await prisma.drone.upsert({
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
    } catch (e) {
      console.error(e)
      console.warn('DRONE SAVING !!!!!!!!!!!!!!!')
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
    console.warn('DEVICE SAVE !!!!!!!!!!!!!!!!')
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
      saveDrones(parsedData[1], false)
      saveDevice(parsedData[2])
    })
    .catch((error) => {
      console.warn('SCANNING SCANNING SCANNING')
      console.error(error)
      console.warn('SCANNING SCANNING SCANNING')
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
