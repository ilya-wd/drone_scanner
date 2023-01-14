const { filterPosition, saveDrones } = require('../utils/drone_helper')
const { prisma } = require('../prisma/prismaClient')
const dronesRouter = require('express').Router()
const axios = require('axios')
const convert = require('xml-js')

dronesRouter.get('/scan', async (request, response) => {
  const drones = await axios.get('https://assignments.reaktor.com/birdnest/drones')
  const data = JSON.parse(convert.xml2json(drones.data, { compact: true, spaces: 2 }))
  const filteredDrones = data.report.capture.drone.filter((x) => filterPosition(x))

  saveDrones(filteredDrones)
})

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

module.exports = dronesRouter
