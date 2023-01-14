const dronesRouter = require('./controllers/droneController')
const pilotsRouter = require('./controllers/pilotController')
const axios = require('axios')
const express = require('express')
const cors = require('cors')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
var cron = require('node-cron')
const { cronScan, cronDelete } = require('./utils/cronTasks')

const app = express()

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use('/api/drones', dronesRouter)
app.use('/api/pilots', pilotsRouter)

cronDelete()
cronScan()

app.use(middleware.unknownEndpoint)

app.use(middleware.errorHandler)

module.exports = app
