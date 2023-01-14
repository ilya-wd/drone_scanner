import axios from 'axios'

const baseUrl =
  process.env.NODE_ENV === 'development' ? '/api/pilots' : 'http://localhost:3030//api/pilots'

const getAllPilots = async () => {
  const request = await axios.get(`${baseUrl}/get_pilots`)
  return request.data
}

export default { getAllPilots }
