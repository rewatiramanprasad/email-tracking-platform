import { db } from '@/lib/db'
import { unstable_noStore as noStore } from 'next/cache'

export async function getClickEvents(): Promise<number> {
  noStore()
  const res = await db.query<{
    count: string
  }>(`
    SELECT COUNT(*) AS count
    FROM email_events
    WHERE event_type = 'click'
  `)

  return Number(res.rows[0]?.count)
}
