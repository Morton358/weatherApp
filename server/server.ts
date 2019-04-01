import dotenv from 'dotenv'
import express from 'express'
import bodyParser from 'body-parser'

dotenv.config()

const app: express.Application = express()
const API_PORT = process.env.SERVER_API_PORT || 5000

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/api', (req, res) => {
  res.send('Hello From Express')
})

app.post('/api/world', (req, res) => {
  console.log(req.body)
  res.send(`I received your POST request. This is what you sent me: ${req.body.post}`)
})

app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`))
