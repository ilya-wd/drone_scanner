const dronesRouter = require('express').Router()
const { findDevice, findNDZDronesWithPilots } = require('../utils/dbQueries')

dronesRouter.get('/get_data', async (request, response) => {
  const uptime = process.uptime()
  const device = await findDevice()
  const NDZDronesWitPilots = await findNDZDronesWithPilots()
  response.json([NDZDronesWitPilots, [device], uptime])
})

module.exports = dronesRouter
