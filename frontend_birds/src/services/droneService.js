import axios from 'axios'

// const prisma = new PrismaClient()
const baseUrl = 'http://localhost:3030/api/drones'

const getAllDrones = async () => {
  const request = await axios.get(`${baseUrl}/get_drones`)
  console.log('drones: ', request.data)
  // return request.then((response) => response.data)
  return request.data
}

export default { getAllDrones }
