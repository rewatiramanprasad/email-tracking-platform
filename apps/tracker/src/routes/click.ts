import { Request, Response } from 'express'
import { db } from '../utils/db'

export const clickRoute = async (req: Request, res: Response) => {
  const { emailId, url } = req.query

  if (emailId && url) {
    await db.query(
      `INSERT INTO email_events(email_id,ip,event_type,user_agent) VALUES ($1,$2,'click',$3)`,
      [emailId, req.ip, req.headers['user-agent']],
    )
  }

  res.redirect(url as string)
}
