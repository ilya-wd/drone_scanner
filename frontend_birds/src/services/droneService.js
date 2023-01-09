import axios from 'axios'

// const prisma = new PrismaClient()
const baseUrl = '/api/drones'

const getAll = async () => {
  const request = await axios.get(`${baseUrl}/get_drones`)
  // console.log('REQUEST', request.data)
  // return request.then((response) => response.data)
  return request.data
}

export default { getAll }
