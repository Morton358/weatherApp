import express from 'express'

const api = (emiter: SocketIO.Server, store: any) => {
  const router = express.Router()

  router.post('/weather/notification/:cityID', (req, res, next) => {
    console.log(
      `SERVER: API received your POST request, for cityID: ${req.params.cityID} This is what you sent me: ${req.body}`
    )
    console.log(req.body)
    store.set(req.params.cityID, req.body)
    emiter
      .to(process.env.API_TOKEN as string)
      .emit('weatherNotification', { cityID: req.params.cityID, weather: req.body })
    res.send(true)
  })

  return router
}

export default api
