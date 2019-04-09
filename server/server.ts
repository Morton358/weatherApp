import dotenv from 'dotenv'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import _io from 'socket.io'
import http from 'http'
// @ts-ignore
import Store from 'data-store'

import router from './routes/index'
import socketConnector from './socketConnector'

const store = new Store({ path: 'config.json' })
store.clear()
dotenv.config()

const app: express.Application = express()
const PORT = process.env.SERVER_PORT || 5000

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// @ts-ignore
const server = http.Server(app)
const io = _io(server, { origins: '*:*' })
io.on('connection', socketConnector)
app.use('/', router(io, store))

server.listen(PORT, () => console.log(`LISTENING ON PORT ${PORT}`))
