import dotenv from 'dotenv'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import * as apiRequests from './apiRequests'

dotenv.config()

const app: express.Application = express()
const PORT = process.env.SERVER_PORT || 5000

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*')
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
//   next()
// })
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/server', (req, res) => {
  res.send('Hello From Express')
})

// app.post('/api/world', (req, res) => {
//   console.log(req.body)
//   res.send(`I received your POST request. This is what you sent me: ${req.body.post}`)
// })

app.get('/server/subscribe/:cityID', async (req, res) => {
  try {
    const result = await apiRequests.subscribeToCity(req.params.cityID)
    res.send(result)
  } catch (error) {
    console.error(error)
    res.send(false)
  }
})

app.post('/api/weather/:cityID', (req, res) => {
  console.log(
    `SERVER: API received your POST request, for cityID: ${req.params.cityID} This is what you sent me: ${req.body}`
  )
  console.log(req.body)
  res.send(true)
})

app.listen(PORT, () => console.log(`LISTENING ON PORT ${PORT}`))
