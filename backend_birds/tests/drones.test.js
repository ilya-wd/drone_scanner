const supertest = require('supertest')
const testHelper = require('./test_helper')
const { app } = require('../index')
const api = supertest(app)
const droneHelper = require('../utils/drone_helper')
const { prisma } = require('../prisma/prismaClient')

describe('scanning works', () => {
  test('when few calls are made to Reaktor drone api, it is expected that some drones will be added to database and some pilots will be found', async () => {
    let i = 0
    while (i < 10) {
      droneHelper.droneScan()
      droneHelper.sleep(2)
      i++
    }
    const drones = await prisma.drone.findMany({})
    const pilots = await prisma.pilot.findMany({})
    expect(drones.length).toBeGreaterThan(0)
    expect(pilots.length).toBeGreaterThan(0)
  })
})
