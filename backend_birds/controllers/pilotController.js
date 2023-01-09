const { PrismaClient } = require('@prisma/client')
const axios = require('axios')
const prisma = new PrismaClient()
const pilotsRouter = require('express').Router()

pilotsRouter.get('/get_pilots', async (request, response) => {
  const pilots = await prisma.pilot.findMany({})
  response.json(pilots)
})

module.exports = pilotsRouter
