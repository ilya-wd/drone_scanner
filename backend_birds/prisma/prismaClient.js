const { PrismaClient } = require('@prisma/client')

const dbUrl = process.env.NODE_ENV === 'test' ? 'file:./test.db' : 'file:./dev.db'

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: dbUrl,
    },
  },
})

module.exports = { prisma }
