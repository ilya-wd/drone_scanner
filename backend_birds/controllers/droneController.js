const dronesRouter = require('express').Router()
const logger = require('../utils/logger')
const { PrismaClient } = require('@prisma/client')
const { filterPosition, saveDrones } = require('../utils/drone_helper')
const { response } = require('../app')

const prisma = new PrismaClient()

dronesRouter.get('/scan', async (request, response) => {
  const drones = await axios.get('https://assignments.reaktor.com/birdnest/drones')
  const data = JSON.parse(convert.xml2json(drones.data, { compact: true, spaces: 2 }))
  const filteredDrones = data.report.capture.drone.filter((x) => filterPosition(x))

  saveDrones(filteredDrones)
})

dronesRouter.get('/cleandb', async (request, response) => {
  await prisma.drone.deleteMany({})
})

dronesRouter.get('/get_drones', async (request, response) => {
  const drones = await prisma.drone.findMany({})

  console.log('DRONES CONTR', drones)
  response.json(drones)

  //   const getPosts = await prisma.post.findMany({
  //   where: {
  //     title: {
  //       contains: 'cookies',
  //     },
  //   },
  //   include: {
  //     author: true, // Return all fields
  //   },
  // })
})

module.exports = dronesRouter
