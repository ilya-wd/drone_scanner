const convert = require('xml-js')
const { saveDrone, saveDevice, findUniqueDrone } = require('./dbQueries')
const { fetchPilot, fetchDrones } = require('./apiQueries')

const filterPosition = (drone, insideNDZ) => {
  const distance = calculateDistance(drone)
  return insideNDZ ? distance < 100 : distance > 100
}

const calculateDistance = (drone) => {
  const [droneY, droneX] = [
    Number(drone.positionY._text) / 1000,
    Number(drone.positionX._text) / 1000,
  ]
  const distance = Math.sqrt(Math.pow(droneY - 250, 2) + Math.pow(droneX - 250, 2))
  return distance
}

const saveDrones = async (drones) => {
  for (const drone of drones) {
    const foundDrone = await findUniqueDrone(drone)
    const distance = calculateDistance(drone)
    let closestDist = distance
    let pilot

    // making a call in case data about the pilot has been added tot he server
    if (!foundDrone) {
      pilot = await fetchPilot(drone.serialNumber._text)
    }

    if (foundDrone && closestDist > foundDrone.closestDistance) {
      closestDist = foundDrone.closestDistance
    }
    saveDrone(drone, pilot, distance, closestDist).catch((error) => console.error(error))
  }
}

const sleep = (seconds) => new Promise((resolve) => setTimeout(resolve, seconds * 1000))

const droneScan = async () => {
  fetchDrones()
    .then((data) => parseXml(data))
    .then((parsedData) => {
      saveDrones(parsedData[0])
      saveDevice(parsedData[1])
    })
    .catch((error) => {
      console.error(error)
      sleep(5)
    })
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
