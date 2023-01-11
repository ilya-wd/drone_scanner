const { PrismaClient } = require('@prisma/client')
const axios = require('axios')

const prisma = new PrismaClient()

const filterPosition = (drone) => {
  const distance = calculateDistance(drone)
  console.log(distance)
  console.log(distance < 100000)
  return distance < 100000
}

const calculateDistance = (drone) => {
  const [droneY, droneX] = [Number(drone.positionY._text), Number(drone.positionX._text)]
  const distance = Math.sqrt(Math.pow(droneY - 250000, 2) + Math.pow(droneX - 250000, 2))
  return distance
}

const saveDrones = async (drones) => {
  drones.forEach(async (drone) => {
    const existingDrone = await prisma.drone.findUnique({
      where: {
        serialNumber: drone.serialNumber._text,
      },
    })

    // console.log(drone.serialNumber._text)
    if (existingDrone === null) {
      // 1. find a pilot
      const pilot = await fetchPilot(drone.serialNumber._text)
      // const pilot = await axios.get(`https://assignments.reaktor.com/birdnest/pilots/${drone.serialNumber._text}`)
      // console.log('PILOT', pilot)

      let createdDr
      if (pilot) {
        createdDr = await prisma.drone.create({
          data: {
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
            pilot: {
              create: {
                pilotId: pilot.data.pilotId,
                firstName: pilot.data.firstName,
                lastName: pilot.data.lastName,
                phoneNumber: pilot.data.phoneNumber,
                created: pilot.data.createdDt,
                email: pilot.data.email,
              },
            },
          },
        })
      } else {
        createdDr = await prisma.drone.create({
          data: {
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
            pilot: undefined,
          },
        })
      }

      console.log('CREATED', createdDr)
      createdDr
    } else {
      console.log('DRONE TO UPDATE', drone)

      if (existingDrone.pilot) {
        // const pilotForUpdate = drone.pilot ? drone.pilot : undefined
        // const pilotForUpdate = drone.pilot ? drone.pilot : await fetchPilot(drone.serialNumber._text)
        await prisma.drone.updateMany({
          where: {
            serialNumber: existingDrone.serialNumber,
          },
          data: {
            lastSavedAt: new Date(Date.now()).toISOString(),
            currentDistance: calculateDistance(drone),
            closestDistance: calculateDistance(drone) < existingDrone.closestDistance ? calculateDistance(drone) : existingDrone.closestDistance,
            manufacturer: existingDrone.manufacturer,
            mac: existingDrone.mac,
            ipv4: existingDrone.ipv4,
            ipv6: existingDrone.ipv6,
            firmware: existingDrone.firmware,
            positionY: Number(existingDrone.positionY),
            positionX: Number(existingDrone.positionX),
            altitude: Number(existingDrone.altitude),
            pilot: existingDrone.pilot,
          },
        })
      } else {
        const fetchedPilot = fetchPilot(existingDrone.serialNumber)
        const pilotForUpdate = fetchedPilot ? fetchPilot : undefined

        await prisma.drone.updateMany({
          where: {
            serialNumber: existingDrone.serialNumber,
          },
          data: {
            lastSavedAt: new Date(Date.now()).toISOString(),
            currentDistance: calculateDistance(drone),
            closestDistance: calculateDistance(drone) < existingDrone.closestDistance ? calculateDistance(drone) : existingDrone.closestDistance,
            manufacturer: existingDrone.manufacturer,
            mac: existingDrone.mac,
            ipv4: existingDrone.ipv4,
            ipv6: existingDrone.ipv6,
            firmware: existingDrone.firmware,
            positionY: Number(existingDrone.positionY),
            positionX: Number(existingDrone.positionX),
            altitude: Number(existingDrone.altitude),
            pilot: pilotForUpdate,
          },
        })
      }
    }
  })
}

const deleteDrones = async () => {
  // console.log('DELETING')
  const drones = await prisma.drone.findMany({})
  const dateNow = new Date(Date.now()).toISOString()

  const dronesFiltered = drones.filter((drone) => new Date(dateNow) - drone.lastSavedAt > 10)

  await prisma.drone.deleteMany({
    where: {
      serialNumber: {
        in: dronesFiltered.map((d) => d.serialNumber),
      },
    },
  })

  // console.log('SHOULD BE DELETED')
}

const fetchPilot = (serialNumber) => {
  axios
    .get(`https://assignments.reaktor.com/birdnest/pilots/${serialNumber}`)
    .then((pilot) => {
      return pilot
    })
    .catch((error) => {
      console.log("Couldn't fetch a pilot, will retry later")
      undefined
    })
}

const sleep = (seconds) => new Promise((resolve) => setTimeout(resolve, seconds * 1000))

module.exports = { filterPosition, saveDrones, deleteDrones, sleep }