import axios from 'axios'

const baseUrl =
  process.env.NODE_ENV === 'development' ? '/api/drones' : 'http://localhost:3030/api/drones'

const getPerpetrators = async () => {
  const request = await axios.get(`${baseUrl}/get_perpetrators`)
  return request.data
}

export default { getAllDrones, getPerpetrators }
