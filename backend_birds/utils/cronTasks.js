const cron = require('node-cron')
const { deleteDrones, droneScan } = require('./drone_helper')

const cronDelete = () => {
  cron.schedule('*/2 * * * *', () => {
    console.log('CRONTASKS.JS')
    deleteDrones()
  })
}
let i = 0
const cronScan = () => {
  cron.schedule('*/4 * * * * *', () => {
    i += 1
    console.log('--- REQ ---', i)
    droneScan()
    // let updates = droneScan() TODO: need to return something in dronescan
    // websocket.push(updates) or websocket.send / websocket.update
  })
}

module.exports = {
  cronScan,
  cronDelete,
}
