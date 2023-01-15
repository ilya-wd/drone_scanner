const { saveDevice, saveDrones, parseXml } = require('../utils/drone_helper')
const { prisma } = require('../prisma/prismaClient')
const dronesRouter = require('express').Router()
const axios = require('axios')

dronesRouter.get('/get_perpetrators', async (request, response) => {
  const now = new Date()
  const tenMinutes = 60 * 10 * 1000
  const drones = await prisma.drone.findMany({
    where: {
      lastSavedAt: {
        gt: new Date(now - tenMinutes),
      },
    },
    orderBy: {
      lastSavedAt: 'asc',
    },
  })
  const pilots = await prisma.pilot.findMany({})
  const filteredMatchedDrones = drones.map((drone) => ({
    ...drone,
    pilot: pilots.find((p) => p.droneId === drone.id),
  }))
  response.json(filteredMatchedDrones)
})

dronesRouter.get('/get_device', async (request, response) => {
  const device = await prisma.device.findFirst({
    orderBy: { lastSavedAt: 'desc' },
  })

  response.json(device)
})

module.exports = dronesRouter
