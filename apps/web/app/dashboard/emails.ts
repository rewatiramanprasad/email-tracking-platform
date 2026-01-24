import { db } from '@/lib/db'

export async function getEmails() {
  const res = await db.query(`
    SELECT id, to_email, subject, open_count
    FROM emails
    ORDER BY sent_at DESC
    LIMIT 50
  `)

  return res.rows
}
