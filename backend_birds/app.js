// import { response } from 'express'

const axios = require('axios')
const express = require('express')
const cors = require('cors')
const convert = require('xml-js')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const { PrismaClient } = require('@prisma/client')

const app = express()

app.use(express.json())

const port = process.env.PORT || '3000'

app.listen(port, () => {
  console.log(`Server Running at ${port} 🚀`)
})

const prisma = new PrismaClient()

const droneCalls = axios.create({
  baseUrl: 'https://assignments.reaktor.com/birdnest/drones',
  timeout: 1000,
  headers: {},
})

const gettingDrones = async () => {
  const response = await droneCalls.get()
  response.xml()
}

const filterPosition = (drone) => {
  const [droneY, droneX] = [Number(drone.positionY._text), Number(drone.positionX._text)]

  // console.log(droneY)

  const distance = Math.sqrt(Math.pow(droneY - 250000, 2) + Math.pow(droneX - 250000, 2))
  console.log(distance)
  console.log(distance < 100000)
  return distance < 100000
}

const saveDrones = (drones) => {}

app.get('/scan', async (req, res) => {
  const drones = await axios.get('https://assignments.reaktor.com/birdnest/drones')
  const data = JSON.parse(convert.xml2json(drones.data, { compact: true, spaces: 2 }))
  // console.log('DEFAULT', data.report.capture.drone)
  // console.log(
  //   'FILTERED',
  //   data.report.capture.drone.filter((x) => filterPosition(x))
  // )
  const filtered = data.report.capture.drone.filter((x) => filterPosition(x))
  console.log('FILTERED', filtered)
})

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.unknownEndpoint)

app.use(middleware.errorHandler)

module.exports = app
