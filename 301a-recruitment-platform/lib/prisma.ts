import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL not found in environment variables');
}

// Configure pool with explicit SSL settings for Heroku
// Optimized for performance with connection pooling
const pool = new pg.Pool({ 
  connectionString: DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
    // Heroku requires SSL but doesn't need certificate verification
  },
  max: 10, // Reduced to prevent connection exhaustion on free tier
  min: 2, // Keep minimum connections alive
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000, // Faster timeout for failed connections
  allowExitOnIdle: true, // Allow process to exit when connections are idle
})

const adapter = new PrismaPg(pool)

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma