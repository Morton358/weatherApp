import express from 'express'

import { api } from './api'
import { server } from './server'

export const router = (emiter: SocketIO.Server, store: any) => {
  const mainRouter = express.Router()

  mainRouter.use('/api', api(emiter, store))
  mainRouter.use('/server', server(emiter, store))

  return mainRouter
}
