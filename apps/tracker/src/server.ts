import express from 'express'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import { openRoute } from './routes/open'
import { clickRoute } from './routes/click'

const app = express()

app.use(helmet())
app.use(rateLimit({ windowMs: 60000, max: 300 }))

app.get('/open', openRoute)
app.get('/click', clickRoute)

export default app
