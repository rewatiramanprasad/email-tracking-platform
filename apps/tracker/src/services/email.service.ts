import { db } from '../utils/db'
import { google } from 'googleapis'

const oauth2Client = new google.auth.OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  'https://developers.google.com/oauthplayground',
)

oauth2Client.setCredentials({
  refresh_token: process.env.GMAIL_REFRESH_TOKEN,
})

const gmail = google.gmail({ version: 'v1', auth: oauth2Client })

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
     WHERE id=$1 `,
    [data.emailId],
  )

  const res = await db.query(`SELECT * FROM emails WHERE id=$1`, [data.emailId])

  const subject = res.rows[0]?.subject
  const recipient_email = res.rows[0]?.to_email

  if (subject && recipient_email) {
    
    setImmediate(async () => {
      try {
        const query = `subject:"${subject}" to:${recipient_email}`

        const searchRes = await gmail.users.messages.list({
          userId: 'me',
          q: query,
          maxResults: 1,
        })

        const messages = searchRes.data.messages

        if (messages && messages.length > 0) {
          await gmail.users.messages.modify({
            userId: 'me',
            id: messages[0].id!,
            requestBody: {
              addLabelIds: ['Label_8684389436941946105'],
              removeLabelIds: ['UNREAD'],
            },
          })
          console.log(`Labeled email to ${recipient_email}`)
        }
      } catch (error) {
        console.error('Gmail background task failed:', error)
      }
    })
  }
}
