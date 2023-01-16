const pilotsRouter = require('express').Router()
const { findPilots } = require('../utils/dbQueries')

pilotsRouter.get('/get_pilots', async (request, response) => {
  const pilots = await findPilots()
  response.json(pilots)
})

module.exports = pilotsRouter
