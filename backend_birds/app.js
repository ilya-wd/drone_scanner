const dronesRouter = require('./controllers/droneController')
const pilotsRouter = require('./controllers/pilotController')
const axios = require('axios')
const express = require('express')
const cors = require('cors')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
var cron = require('node-cron')
const { deleteDrones, sleep, filterPosition, saveDrones } = require('./utils/drone_helper')
const convert = require('xml-js')

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

// const cronScan = cron.schedule('20/* * * * * *', async () => {
//   await axios.get('http://localhost:3030/api/drones/scan')
// })

let i = 0
const cronScan = cron.schedule('*/2 * * * * *', () => {
  i += 1
  console.log('--- REQ ---', i)
  testingF()
})

const testingF = () => {
  axios
    .get('https://assignments.reaktor.com/birdnest/drones')
    .then((drones) => JSON.parse(convert.xml2json(drones.data, { compact: true, spaces: 2 })))
    .then((data) => data.report.capture.drone.filter((x) => filterPosition(x)))
    .then((filteredDrones) => saveDrones(filteredDrones))
    // .then((savedDrones) => console.log('SAVED DRONES', savedDrones))
    .catch((error) => {
      console.log(error)
      sleep(5)
    })
}

app.use(middleware.unknownEndpoint)

app.use(middleware.errorHandler)

module.exports = app
