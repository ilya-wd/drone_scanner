const dronesRouter = require('express').Router()
const logger = require('../utils/logger')
const { PrismaClient } = require('@prisma/client')
const { filterPosition, saveDrones, checkDroneInDb } = require('../utils/drone_helper')
const axios = require('axios')
const convert = require('xml-js')

const prisma = new PrismaClient()

dronesRouter.get('/scan', async (request, response) => {
  const drones = await axios.get('https://assignments.reaktor.com/birdnest/drones')
  const data = JSON.parse(convert.xml2json(drones.data, { compact: true, spaces: 2 }))
  const filteredDrones = data.report.capture.drone.filter((x) => filterPosition(x))

  // const pilot = await axios.get(`https://assignments.reaktor.com/birdnest/pilots/${drone.serialNumber._text}`)
  // const pilot = await axios.get(`https://assignments.reaktor.com/birdnest/pilots/SN-MUsmCEwkGV`)
  // console.log('PILOT', pilot)

  // checkDroneInDb('SN-9p').then((res) => console.log(res))
  saveDrones(filteredDrones.slice(0, 1))
})

dronesRouter.get('/cleandb', async (request, response) => {
  await prisma.drone.deleteMany({})
})

dronesRouter.get('/get_drones', async (request, response) => {
  const drones = await prisma.drone.findMany({})
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
