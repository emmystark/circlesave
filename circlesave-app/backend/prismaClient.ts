// backend/prismaClient.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  log: ['query', 'error', 'warn'], // Optional: helps with debugging
})

export default prisma