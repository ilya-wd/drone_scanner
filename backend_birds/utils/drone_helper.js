const convert = require('xml-js')
const { saveDrone, saveDevice, findUniqueDrone } = require('./dbQueries')
const { fetchPilot, fetchDrones } = require('./apiQueries')

const filterPosition = (drone, insideNDZ) => {
  const distance = calculateDistance(drone)
  return insideNDZ ? distance < 100000 : distance > 100000
}

const calculateDistance = (drone) => {
  const [droneY, droneX] = [Number(drone.positionY._text), Number(drone.positionX._text)]
  const distance = Math.sqrt(Math.pow(droneY - 250000, 2) + Math.pow(droneX - 250000, 2))
  return distance
}

const saveDrones = async (drones) => {
  for (const drone of drones) {
    const foundDrone = await findUniqueDrone(drone)
    const distance = calculateDistance(drone)
    let closestDist = distance
    let pilot

    if (!foundDrone) {
      pilot = await fetchPilot(drone.serialNumber._text)
    }

    if (foundDrone && closestDist > foundDrone.closestDistance) {
      closestDist = foundDrone.closestDistance
    }

    try {
      await saveDrone(drone, pilot, distance, closestDist)
    } catch (e) {
      console.error(e)
    }
  }
}

const sleep = (seconds) => new Promise((resolve) => setTimeout(resolve, seconds * 1000))

const droneScan = async () => {
  try {
    const data = await fetchDrones()
    const parsedData = parseXml(data)
    saveDrones(parsedData[0])
    saveDevice(parsedData[1])
  } catch (e) {
    console.error(e)
    sleep(5)
  }
}

const parseXml = (drones) => {
  const parsedData = JSON.parse(convert.xml2json(drones.data, { compact: true, spaces: 2 }))
  const dronesInside = parsedData.report.capture.drone.filter((x) => filterPosition(x, true))
  const deviceInfo = parsedData.report.deviceInformation
  return [dronesInside, deviceInfo]
}

module.exports = {
  filterPosition,
  saveDrones,
  sleep,
  droneScan,
  parseXml,
  calculateDistance,
}
