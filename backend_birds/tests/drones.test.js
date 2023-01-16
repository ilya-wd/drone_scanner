const supertest = require('supertest')
const testHelper = require('./test_helper')
const { app } = require('../index')
const api = supertest(app)
const droneHelper = require('../utils/drone_helper')
const { prisma } = require('../prisma/prismaClient')
// const { prisma } = require('./singleton')
// const parseString = require('xml2js').parseString
// const xml2js = require('xml2js')
// fs = require('fs')
// var parser = new xml2js.Parser().parseString()
// describe('xml processing', () => {
//   // const drones = parseString(testHelper.initialDronesXML, (err, res) => {
//   //   console.log(res)
//   //   res.report.capture
//   // })

//   const parser = new DOMParser()
//   const drones = parser.parseFromString(testHelper.initialDronesXML, 'text/xml')

//   test('when data is in xml, it is processed in an array', () => {
//     const result = droneHelper.parseXml(drones)
//     expect(result).toBeInstanceOf(Array)
//   })
//   test('when data is in xml, correct number of drones are considered within NDZ', () => {
//     const result = droneHelper.parseXml(drones)
//     expect(result.length).toBe(4)
//   })
//   test('when data is in xml, drones are successfully saved to the database', async () => {
//     const dronesProcessed = droneHelper.parseXml(drones)
//     droneHelper.saveDrones(dronesProcessed)
//     const result = prisma.drone.findMany({})
//     expect(result.length).toBe(4)
//   })
// })

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

describe('making calls to local api', () => {
  test('when api call is made to /scan few times, it is expected that some drones will be added to database', () => {})

  test('when api call is made to /get_perpetrators, it is expected that perpetrators will be send back in the response', () => {})
  test('when api call is made to /get_pilots after few repeated /scan calls, it is expected that number of pilots in the DB will be more than 0', () => {})
})
