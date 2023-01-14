import axios from 'axios'

const baseUrl = '/api/pilots'

const getAllPilots = async () => {
  const request = await axios.get(`${baseUrl}/get_pilots`)
  return request.data
}

export default { getAllPilots }
