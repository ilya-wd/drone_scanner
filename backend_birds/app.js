// import { response } from 'express'
const dronesRouter = require('./controllers/droneController')
const pilotsRouter = require('./controllers/pilotController')
const axios = require('axios')
const express = require('express')
const cors = require('cors')
const convert = require('xml-js')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const { PrismaClient } = require('@prisma/client')
var cron = require('node-cron')
const { deleteDrones } = require('./utils/drone_helper')

const app = express()

app.use(express.json())

const port = process.env.PORT || '3000'

app.listen(port, () => {
  console.log(`Server Running at ${port} 🚀`)
})

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use('/api/drones', dronesRouter)
app.use('/api/pilots', pilotsRouter)

const cronScan = cron.schedule('30/* * * * * *', async () => {
  await axios.get('http://localhost:3030/api/drones/scan')
})

// const cronDelete = cron.schedule('3 * * * * *', () => {
//   console.log('DRONES DELETED')
//   deleteDrones()
// })

app.use(middleware.unknownEndpoint)

app.use(middleware.errorHandler)

module.exports = app

// const prisma = new PrismaClient()

// const droneCalls = axios.create({
//   baseUrl: 'https://assignments.reaktor.com/birdnest/drones',
//   timeout: 1000,
//   headers: {},
// })

// const gettingDrones = async () => {
//   const response = await droneCalls.get()
//   response.xml()
// }

// const filterPosition = (drone) => {
//   const [droneY, droneX] = [Number(drone.positionY._text), Number(drone.positionX._text)]

//   // console.log(droneY)

//   const distance = Math.sqrt(Math.pow(droneY - 250000, 2) + Math.pow(droneX - 250000, 2))
//   console.log(distance)
//   console.log(distance < 100000)
//   return distance < 100000
// }

// const saveDrones = async (drones) => {
//   // await prisma.drone.deleteMany({})

//   drones.forEach(async (drone) => {
//     const existingDrone = await prisma.drone.findUnique({
//       where: {
//         serialNumber: drone.serialNumber._text,
//       },
//     })

//     if (existingDrone === null) {
//       const createdDrone = await prisma.drone.create({
//         data: {
//           serialNumber: drone.serialNumber._text,
//           manufacturer: drone.manufacturer._text,
//           mac: drone.mac._text,
//           ipv4: drone.ipv4._text,
//           ipv6: drone.ipv6._text,
//           firmware: drone.firmware._text,
//           positionY: Number(drone.positionY._text),
//           positionX: Number(drone.positionX._text),
//           altitude: Number(drone.altitude._text),
//         },
//       })

//       console.log('CREATED', createdDrone)
//     }
//   })
// }

// app.get('/scan', async (req, res) => {
//   const drones = await axios.get('https://assignments.reaktor.com/birdnest/drones')
//   const data = JSON.parse(convert.xml2json(drones.data, { compact: true, spaces: 2 }))
//   const filteredDrones = data.report.capture.drone.filter((x) => filterPosition(x))
//   // if (filteredDrones.length > 0) {
//   //   console.log('SERIAL NUMBER', filteredDrones[0].serialNumber)
//   // }

//   // console.log('SIZE', filtered)
//   // saveDrones(filteredDrones)
// })
