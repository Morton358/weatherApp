import express from 'express'

import api from './api'
import server from './server'

const router = (emiter: SocketIO.Server) => {
  const mainRouter = express.Router()

  mainRouter.use('/api', api(emiter))
  mainRouter.use('/server', server(emiter))

  return mainRouter
}

export default router
