
import { db } from '@/lib/db'


export async function getNotTracked() {
  const res = await db.query(`
    SELECT COUNT(*) AS count
    FROM emails
    WHERE open_count = 0
  `)

  return Number(res.rows[0]?.count)
}
