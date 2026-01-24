import { Request, Response } from 'express'
import { db } from '../../../../packages/db'
import { v4 as uuid } from 'uuid'

export const clickRoute = async (req: Request, res: Response) => {
  const { emailId, url } = req.query

  if (emailId && url) {
    await db.query(
      `INSERT INTO email_events VALUES ($1,$2,'click',$3,$4,now())`,
      [uuid(), emailId, req.ip, req.headers['user-agent']],
    )
  }

  res.redirect(url as string)
}
