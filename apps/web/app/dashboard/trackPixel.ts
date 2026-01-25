import { db } from '@/lib/db'
import { unstable_noStore as noStore } from 'next/cache'
export async function getTrackedPixels() {
  noStore()
  const res = await db.query(`
    SELECT count(*)
    FROM email_events where event_type='open'
    
  `)

  return Number(res.rows[0]?.count)
}
