import axios from 'axios'

// const prisma = new PrismaClient()

const getInfo = async () => {
  const request = await axios.get('assignments.reaktor.com/birdnest/drones')
  return request
}

export { getInfo }
