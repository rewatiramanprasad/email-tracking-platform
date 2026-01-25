import express from 'express'
import 'dotenv/config'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import { openRoute } from './src/routes/open'
import { clickRoute } from './src/routes/click'

const app = express()

app.use(helmet())
app.use(rateLimit({ windowMs: 60000, max: 20 }))

app.get('/open', openRoute)
app.get('/click', clickRoute)
app.get('/', (req, res) => {
  res.send('server is working fine')
})

app.listen(process.env.PORT, () => {
  console.log(`server is listening on port ${process.env.PORT}`)
})
