const { prisma } = require('../prisma/prismaClient')
const pilotsRouter = require('express').Router()

pilotsRouter.get('/get_pilots', async (request, response) => {
  const pilots = await prisma.pilot.findMany({})
  response.json(pilots)
})

module.exports = pilotsRouter
