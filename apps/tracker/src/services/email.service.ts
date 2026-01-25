import { db } from '../utils/db'

export const logOpen = async (data: {
  emailId: string
  ip?: string
  userAgent?: string
}) => {
  await db.query(
    `INSERT INTO email_events(email_id,ip,event_type,user_agent) VALUES ($1,$2,'open',$3)`,
    [data.emailId, data.ip, data.userAgent],
  )

  await db.query(
    `UPDATE emails
     SET opened_at = COALESCE(opened_at, now()),
         open_count = open_count + 1
     WHERE id=$1`,
    [data.emailId],
  )
}
