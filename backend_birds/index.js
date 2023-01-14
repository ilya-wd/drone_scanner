const dronesRouter = require('./controllers/droneController')
const pilotsRouter = require('./controllers/pilotController')
const express = require('express')
const cors = require('cors')
const http = require('http')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
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

const PORT = process.env.PORT || 3003
const server = http.createServer(app)

server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})
