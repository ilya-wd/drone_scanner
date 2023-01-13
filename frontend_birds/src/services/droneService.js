import axios from 'axios'

const baseUrl = 'http://localhost:3030/api/drones'

const getAllDrones = async () => {
  const request = await axios.get(`${baseUrl}/get_drones`)
  return request.data
}

const getPerpetrators = async () => {
  const request = await axios.get(`${baseUrl}/get_perpetrators`)
  return request.data
}

export default { getAllDrones, getPerpetrators }
