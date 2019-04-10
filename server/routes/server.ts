import express from 'express'

import { subscribe } from '../controllers/subscribe'
import { weather } from '../controllers/weather'

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

  router.get('/addWidget/:cityID', async (req, res) => {
    const cityID: string = req.params.cityID
    try {
      if (cityID && !store.hasOwn(cityID)) {
        const weatherData = await weather(cityID)
        if (Object.keys(weatherData).length === 0) {
          res.send(new Error("Can't get weather data from api when add the widget"))
        } else {
          const cityData = { [cityID]: weatherData }
          store.set(cityData)
          res.send(cityData)
        }
      } else {
        res.send(new Error('City is already exists in server datastore'))
      }
    } catch (error) {
      console.error(error)
      res.send(error)
    }
    console.log(`server -> routes -> server -> GET /server/addWidget/:cityID -> store.data: ${store.data}`)
    console.log(store.data)
  })

  router.get('/subscribe/:cityID', async (req, res) => {
    try {
      const result = await subscribe(req.params.cityID)
      res.send(result)
    } catch (error) {
      console.error(error)
      res.send(error)
    }
  })

  return router
}

export default server
