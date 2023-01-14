const cron = require('node-cron')
const { deleteDrones, droneScan } = require('./drone_helper')

// Cleaning the database each day at 01:00
const cronDelete = () => {
  cron.schedule(' 0 1 * * *', () => {
    deleteDrones()
  })
}

const cronScan = () => {
  cron.schedule('*/3 * * * * *', () => {
    droneScan()
  })
}

module.exports = {
  cronScan,
  cronDelete,
}
