const dronesRouter = require('./controllers/droneController')
const pilotsRouter = require('./controllers/pilotController')
const axios = require('axios')
const express = require('express')
const cors = require('cors')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
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

// const cronScan = cron.schedule('20/* * * * * *', async () => {
//   await axios.get('http://localhost:3030/api/drones/scan')
// })

const cronScan = cron.schedule('20/* * * * * *', () => {
  axios
    .get('http://localhost:3030/api/drones/scan')
    .then((res) => {
      console.log('SCANNING')
    })
    .catch((error) => {
      console.log(error)
      sleep(5)
    })
})

// const cronDelete = cron.schedule('3 * * * * *', () => {
//   console.log('DRONES DELETED')
//   deleteDrones()
// })

app.use(middleware.unknownEndpoint)

app.use(middleware.errorHandler)

module.exports = app
