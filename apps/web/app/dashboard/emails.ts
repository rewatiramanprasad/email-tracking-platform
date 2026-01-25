import { db } from '@/lib/db'
import { unstable_noStore as noStore } from 'next/cache'

export async function getEmails() {
  noStore()
  const res = await db.query(`
    SELECT id, to_email, subject, open_count
    FROM emails
    ORDER BY sent_at DESC
    LIMIT 50
  `)

  return res.rows
}
