import { db } from '@/lib/db'
import { unstable_noStore as noStore } from 'next/cache'

export async function getTotalEvents() {
  noStore()
  const res = await db.query(`
    SELECT count(*)
    FROM emails
  `)

  return Number(res.rows[0]?.count)
}
