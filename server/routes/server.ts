import express from 'express'

import { subscribe } from '../controllers/subscribe'

const server = (emiter: SocketIO.Server, store: any) => {
  const router = express.Router()

  router.get('/widgets', (req, res) => {
    console.log(`server -> routes -> server -> GET /server/widgets -> store.data: ${store.data}`)
    console.log(store.data)
    if (Object.keys(store.data).length === 0) {
      res.send(new Error('server store is empty !'))
    } else {
      res.send(store.data)
    }
  })

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
