import express from 'express'

import { subscribe } from '../controllers/subscribe'
import { unsubscribe } from '../controllers/unsubscribe'
import { weather } from '../controllers/weather'

export const server = (emiter: SocketIO.Server, store: any) => {
  const router = express.Router()

  router.get('/widgets', (req, res) => {
    if (Object.keys(store.data).length === 0) {
      res.send(new Error('server store is empty !'))
    } else {
      res.send(store.data)
    }
  })

  router.get('/add/:cityID', async (req, res) => {
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
  })

  router.get('/remove/:cityID', async (req, res) => {
    const cityID: string = req.params.cityID
    try {
      if (cityID && store.hasOwn(cityID)) {
        store.del(cityID)
        res.send(true)
      } else {
        res.send(new Error('City is not exist in server datastore, thats why you cant delete it'))
      }
    } catch (error) {
      console.error(error)
      res.send(error)
    }
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

  router.get('/unsubscribe/:cityID', async (req, res) => {
    try {
      const result = await unsubscribe(req.params.cityID)
      res.send(result)
    } catch (error) {
      console.error(error)
      res.send(error)
    }
  })

  router.get('/weather/:cityID', async (req, res) => {
    const cityID: string = req.params.cityID
    try {
      if (cityID && store.hasOwn(cityID)) {
        const weatherData = await weather(cityID)
        if (Object.keys(weatherData).length === 0) {
          res.send(new Error("Can't get weather data from api while get city weather request"))
        } else {
          const cityData = { [cityID]: weatherData }
          store.set(cityData)
          res.send(cityData)
        }
      } else {
        res.send(new Error("Can't find the city in server store while get city weather request"))
      }
    } catch (error) {
      console.error(error)
      res.send(error)
    }
  })

  return router
}
