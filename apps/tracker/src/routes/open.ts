import { Request, Response } from 'express'
import { logOpen } from '../services/email.service'
import { pixelBuffer } from '../utils/pixel'

export const openRoute = async (req: Request, res: Response) => {
  const emailId = req.query.emailId as string
  

  if (emailId) {
  
    await logOpen({
      emailId,
      ip: req.ip,
      userAgent: req.headers['user-agent'],
    })
  }

  res.setHeader('Content-Type', 'image/png')
  res.setHeader('Cache-Control', 'no-store')
  res.send(pixelBuffer)
}
