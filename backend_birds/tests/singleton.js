const PrismaClient = require('@prisma/client')
const { mockDeep, mockReset, DeepMockProxy } = require('jest-mock-extended')

import prisma from './client'

jest.mock('./client', () => ({
  __esModule: true,
  default: mockDeep(),
}))

beforeEach(() => {
  mockReset(prismaMock)
})

module.exports = { prisma }
