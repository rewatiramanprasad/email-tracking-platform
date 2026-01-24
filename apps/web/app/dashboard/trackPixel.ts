import { db } from '@/lib/db'

export async function getTrackedPixels() {
  const res = await db.query(`
    SELECT count(*)
    FROM email_events where event_type='open'
    
  `)

  return Number(res.rows[0]?.count)
}
