const cron = require('node-cron')
const { deleteDrones, droneScan } = require('./drone_helper')

// Cleaning the database each day at 01:00
const cronDelete = () => {
  cron.schedule(' 0 1 * * *', () => {
    if (process.env.NODE_ENV === 'development') {
      console.log('CRONTASKS.JS')
    }
    deleteDrones()
  })
}

// i variable for monitoring uptime, mainly was used in development
let i = 0
const cronScan = () => {
  cron.schedule('*/3 * * * * *', () => {
    if (process.env.NODE_ENV === 'development') {
      i += 1
      console.log('--- REQ ---', i)
    }
    droneScan()
  })
}

module.exports = {
  cronScan,
  cronDelete,
}
