import express from 'express'

export const api = (emiter: SocketIO.Server, store: any) => {
  const router = express.Router()

  router.post('/weather/notification/:cityID', (req, res, next) => {
    store.set(req.params.cityID, req.body)
    emiter
      .to(process.env.API_TOKEN as string)
      .emit('weatherNotification', { cityID: req.params.cityID, weather: req.body })
    res.send(true)
  })

  return router
}
