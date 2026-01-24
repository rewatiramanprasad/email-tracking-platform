'use server'

import nodemailer from 'nodemailer'

type SendEmailInput = {
  to: string
  from: string
  subject: string
  body: string
}

export async function sendEmail(data: SendEmailInput) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  await transporter.sendMail({
    from: data.from,
    to: data.to,
    subject: data.subject,
    html: `
      <p>${data.body}</p>

      <img
        src="${process.env.TRACKER_URL}/open?emailId=${crypto.randomUUID()}"
        width="1"
        height="1"
        style="display:none"
      />
    `,
  })
}
