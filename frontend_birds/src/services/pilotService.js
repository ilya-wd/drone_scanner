import axios from 'axios'

// const prisma = new PrismaClient()
const baseUrl = 'http://localhost:3030/api/pilots'

const getAllPilots = async () => {
  const request = await axios.get(`${baseUrl}/get_pilots`)
  console.log('pilots: ', request.data)
  // return request.then((response) => response.data)
  return request.data
}

export default { getAllPilots }
