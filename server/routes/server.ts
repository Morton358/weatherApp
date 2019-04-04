import express from 'express'

import { subscribe } from '../controllers/subscribe'

const server = (emiter: SocketIO.Server) => {
  const router = express.Router()

  router.get('/subscribe/:cityID', async (req, res) => {
    try {
      const result = await subscribe(req.params.cityID)
      res.send(result)
    } catch (error) {
      console.error(error)
      res.send(false)
    }
  })

  return router
}

export default server
