const axios = require('axios')
const convert = require('xml-js')
const { prisma } = require('../prisma/prismaClient')

const filterPosition = (drone) => {
  const distance = calculateDistance(drone)
  return distance < 100000
}

const calculateDistance = (drone) => {
  const [droneY, droneX] = [Number(drone.positionY._text), Number(drone.positionX._text)]
  const distance = Math.sqrt(Math.pow(droneY - 250000, 2) + Math.pow(droneX - 250000, 2))
  return distance
}

const saveDrones = async (drones) => {
  for await (const drone of drones) {
    let pilot
    try {
      pilot = await axios.get(
        `https://assignments.reaktor.com/birdnest/pilots/${drone.serialNumber._text}`
      )
    } catch (e) {
      console.warn('PILOT ERROR PILOT ERROR PILOT ERROR PILOT ERROR')
      console.error(e)
      console.warn('PILOT ERROR PILOT ERROR PILOT ERROR PILOT ERROR')
    }

    try {
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
      console.warn('!!!!!!!!!!!!!!!!!')
    }
  }
}

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
    .then((drones) => JSON.parse(convert.xml2json(drones.data, { compact: true, spaces: 2 })))
    .then((data) => data.report.capture.drone.filter((x) => filterPosition(x)))
    .then((filteredDrones) => saveDrones(filteredDrones))
    .catch((error) => {
      console.warn('SCANNING SCANNING SCANNING')
      console.error(error)
      console.warn('SCANNING SCANNING SCANNING')
      sleep(5)
    })
}

module.exports = { filterPosition, saveDrones, deleteDrones, sleep, droneScan }
