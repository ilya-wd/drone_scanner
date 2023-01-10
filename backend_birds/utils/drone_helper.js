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
      const pilot = await axios.get(`https://assignments.reaktor.com/birdnest/pilots/${drone.serialNumber._text}`)
      // 1. find a pilot

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
            distanceToNest: calculateDistance(drone),
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
            distanceToNest: calculateDistance(drone),
            pilot: undefined,
          },
        })
      }

      console.log('CREATED', createdDr)
      createdDr
    } else {
      console.log('DRONE TO UPDATE', drone)

      const pilotForUpdate = drone.pilot ? drone.pilot : undefined
      await prisma.drone.update({
        where: {
          serialNumber: drone.serialNumber._text,
        },
        data: {
          lastSavedAt: new Date(Date.now()).toISOString(),
          distanceToNest: calculateDistance(drone),
          manufacturer: drone.manufacturer._text,
          mac: drone.mac._text,
          ipv4: drone.ipv4._text,
          ipv6: drone.ipv6._text,
          firmware: drone.firmware._text,
          positionY: Number(drone.positionY._text),
          positionX: Number(drone.positionX._text),
          altitude: Number(drone.altitude._text),
          pilot: pilotForUpdate,
        },
      })
    }
  })
}

const deleteDrones = async () => {
  // console.log('DELETING')
  const drones = await prisma.drone.findMany({})
  const dateNow = new Date(Date.now()).toISOString()

  const dronesFiltered = drones.filter((drone) => new Date(dateNow) - drone.lastSavedAt > 10)

  // dronesFiltered.map(async (drone) => {
  //   await prisma.drone.delete({
  //     where: {
  //       serialNumber: drone.serialNumber,
  //     },
  //   })
  // })

  await prisma.drone.deleteMany({
    where: {
      serialNumber: {
        in: dronesFiltered.map((d) => d.serialNumber),
      },
    },
  })

  // console.log('SHOULD BE DELETED')
}

module.exports = { filterPosition, saveDrones, deleteDrones }
