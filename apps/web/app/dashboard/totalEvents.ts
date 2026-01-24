

import { db } from '@/lib/db'

export async function getTotalEvents() {
  const res = await db.query(`
    SELECT count(*)
    FROM emails
  `)

  return Number(res.rows[0]?.count)
}
