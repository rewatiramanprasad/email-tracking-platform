import { db } from '../../../../packages/db'
import { v4 as uuid } from 'uuid'

export const logOpen = async (data: {
  emailId: string
  ip?: string
  userAgent?: string
}) => {
  await db.query(`INSERT INTO email_events VALUES ($1,$2,'open',$3,$4,now())`, [
    uuid(),
    data.emailId,
    data.ip,
    data.userAgent,
  ])

  await db.query(
    `UPDATE emails
     SET opened_at = COALESCE(opened_at, now()),
         open_count = open_count + 1
     WHERE id=$1`,
    [data.emailId],
  )
}
