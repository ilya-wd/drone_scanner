const cron = require('node-cron')
const { droneScan } = require('./drone_helper')
const { deleteDrones } = require('./dbQueries')

// Cleaning the database each day at 01:00
const cronDelete = () => {
  cron.schedule(' 0 1 * * *', () => {
    deleteDrones()
  })
}

const cronScan = () => {
  cron.schedule('* * * * * *', () => {
    droneScan()
  })
}

module.exports = {
  cronScan,
  cronDelete,
}
