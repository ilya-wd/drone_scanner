const dronesRouter = require('express').Router()
const { PrismaClient } = require('@prisma/client')
const { filterPosition, saveDrones, filterDronesRecent } = require('../utils/drone_helper')
const axios = require('axios')
const convert = require('xml-js')

const prisma = new PrismaClient()

dronesRouter.get('/scan', async (request, response) => {
  const drones = await axios.get('https://assignments.reaktor.com/birdnest/drones')
  const data = JSON.parse(convert.xml2json(drones.data, { compact: true, spaces: 2 }))
  const filteredDrones = data.report.capture.drone.filter((x) => filterPosition(x))

  saveDrones(filteredDrones)
})

dronesRouter.get('/get_drones', async (request, response) => {
  const drones = await prisma.drone.findMany({})
  response.json(filterDronesRecent(drones))
})

dronesRouter.get('/get_perpetrators', async (request, response) => {
  const drones = await prisma.drone.findMany({})
  const pilots = await prisma.pilot.findMany({})
  const filteredMatchedDrones = filterDronesRecent(drones).map((drone) => ({
    ...drone,
    pilot: pilots.find((p) => p.droneId === drone.id),
  }))
  response.json(filteredMatchedDrones)
})

module.exports = dronesRouter
