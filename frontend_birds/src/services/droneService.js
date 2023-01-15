import axios from 'axios'

const baseUrl =
  process.env.NODE_ENV === 'development' ? '/api/drones' : 'http://localhost:3030/api/drones'

const getData = async () => {
  const request = await axios.get(`${baseUrl}/get_data`)
  return request.data
}

export default { getData, getPerpetrators }
