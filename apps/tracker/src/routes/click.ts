import { Request, Response } from 'express'
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

export const clickRoute = async (req: Request, res: Response) => {
  const { emailId, url } = req.query

  if (emailId && url) {
    await db.query(
      `INSERT INTO email_events(email_id,ip,event_type,user_agent) VALUES ($1,$2,'click',$3)`,
      [emailId, req.ip, req.headers['user-agent']],
    )
  }
  const result = await db.query(`SELECT * FROM emails WHERE id=$1`, [emailId])

  const subject = result.rows[0]?.subject
  const recipient_email = result.rows[0]?.to_email

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
              addLabelIds: ['Label_823957081940653988'],
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

  return res.redirect(302, url as string)
}
