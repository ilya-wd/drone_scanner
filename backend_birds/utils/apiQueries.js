const axios = require('axios')

const fetchPilot = async (serialNumber) => {
  let pilot = undefined
  try {
    pilot = await axios.get(`https://assignments.reaktor.com/birdnest/pilots/${serialNumber}`)
  } catch (e) {
    console.error(e)
  }
  return pilot
}

const fetchDrones = async () => {
  let res
  try {
    res = await axios.get('https://assignments.reaktor.com/birdnest/drones')
  } catch (e) {
    console.error(e)
  }

  return res
}

module.exports = { fetchPilot, fetchDrones }
