import { Pool } from 'pg'

declare global {
  // Prevent multiple pools in dev (Next.js hot reload)
  // eslint-disable-next-line no-var
  var _pgPool: Pool | undefined
}

console.log('DATABASE_URL', process.env.DATABASE_URL)
export const db =
  global._pgPool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
  })

if (process.env.NODE_ENV !== 'production') {
  global._pgPool = db
}
