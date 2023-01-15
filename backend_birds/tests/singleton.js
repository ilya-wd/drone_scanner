const { mockDeep, mockReset, DeepMockProxy } = require('jest-mock-extended')

const { prisma } = require('../prisma/prismaClient')

jest.mock('../prisma/prismaClient.js', () => ({
  __esModule: true,
  default: mockDeep(),
}))

beforeEach(() => {
  mockReset('../prisma/prismaClient')
})

module.exports = { prisma }
