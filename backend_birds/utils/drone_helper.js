const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const filterPosition = (drone) => {
  const [droneY, droneX] = [Number(drone.positionY._text), Number(drone.positionX._text)]

  // console.log(droneY)

  const distance = Math.sqrt(Math.pow(droneY - 250000, 2) + Math.pow(droneX - 250000, 2))
  console.log(distance)
  console.log(distance < 100000)
  return distance < 100000
}

const saveDrones = async (drones) => {
  // await prisma.drone.deleteMany({})

  drones.forEach(async (drone) => {
    const existingDrone = await prisma.drone.findUnique({
      where: {
        serialNumber: drone.serialNumber._text,
      },
    })

    if (existingDrone === null) {
      const createdDrone = await prisma.drone.create({
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
        },
      })

      console.log('CREATED', createdDrone)
    }
  })
}

module.exports = { filterPosition, saveDrones }
