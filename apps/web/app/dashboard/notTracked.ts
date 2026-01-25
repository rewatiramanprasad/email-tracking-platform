
import { db } from '@/lib/db'
import { unstable_noStore as noStore } from 'next/cache'


export async function getNotTracked() {
    noStore()
  const res = await db.query(`
    SELECT COUNT(*) AS count
    FROM emails
    WHERE open_count = 0
  `)

  return Number(res.rows[0]?.count)
}
