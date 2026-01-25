import { db } from '@/lib/db'
import { unstable_noStore as noStore } from 'next/cache'

export async function getEmails() {
  noStore()
  const res = await db.query(`
    
  SELECT
  e.id,
  e.to_email,
  e.subject,
  e.open_count,
  e.opened_at,

  STRING_AGG(DISTINCT ev.event_type, ', ' ORDER BY ev.event_type) AS event_types,
  MAX(ev.ip) AS ip,
  MAX(ev.user_agent) AS user_agent

FROM emails e
LEFT JOIN email_events ev
  ON e.id = ev.email_id

GROUP BY
  e.id,
  e.to_email,
  e.subject,
  e.open_count,
  e.opened_at

ORDER BY e.opened_at DESC;


 
  `)

  return res.rows
}
