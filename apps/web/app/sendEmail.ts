'use server'

import { db } from '@/lib/db'
import nodemailer from 'nodemailer'
import crypto from 'crypto'

type SendEmailInput = {
  to: string
  subject: string
  body: string
}

export async function sendEmail(data: SendEmailInput) {
  const emailId = crypto.randomUUID()
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })
    console.log(data)

    await transporter.sendMail({
      to: data.to,
      subject: data.subject,
      html: `
      <p>${data.body}</p>

    <a href="${process.env.TRACKER_URL}/click?emailId=${emailId}&url=https://google.com">
    View Details
    </a>

      <img
        src="${process.env.TRACKER_URL}/open?emailId=${emailId}"
        width="1"
        height="1"
        style="display:none"
      />
    `,
    })

    await db.query(
      `
      INSERT INTO emails (id,to_email, subject ,open_count, sent_at)
      VALUES ($1, $2, $3, 0, NOW())
    `,
      [emailId, data.to, data.subject],
    )
  } catch (error) {
    console.error('Error sending email:', error)
    throw new Error('Failed to send email. Please try again.')
  }
}
