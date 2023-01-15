const { prisma } = require('../prisma/prismaClient')
const dronesRouter = require('express').Router()
const axios = require('axios')

dronesRouter.get('/get_data', async (request, response) => {
  const now = new Date()
  const tenMinutes = 60 * 10 * 1000

  const device = await prisma.device.findFirst({
    orderBy: { lastSavedAt: 'desc' },
  })

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
      lastSavedAt: 'asc',
    },
  })

  const nonPerpetrators = await prisma.drone.findMany({
    where: {
      lastSavedAt: {
        gt: new Date(now - tenMinutes),
      },
      closestDistance: {
        gte: 100000,
      },
    },
    orderBy: {
      lastSavedAt: 'asc',
    },
  })
  const pilots = await prisma.pilot.findMany({})
  const filteredMatchedDrones = perpetrators.map((drone) => ({
    ...drone,
    pilot: pilots.find((p) => p.droneId === drone.id),
  }))
  response.json([filteredMatchedDrones, nonPerpetrators, [device]])
})

module.exports = dronesRouter
