import openSocket from 'socket.io-client'

import { store } from '../index'
import * as actions from '../store/actions/index'
import { NotificationData } from '../types'

const initSocket = () => {
  const socket = openSocket(process.env.REACT_APP_SERVER_HOST as string, {
    query: {
      token: process.env.REACT_APP_API_TOKEN,
    },
  })
  socket.on('ready', () => {
    socket.on('weatherNotification', (data: NotificationData) => {
      console.log('services -> notification -> initSocket() -> I will be dispatching notificationCityWeather action')
      console.log(data)
      store.dispatch(actions.notificationCityWeather(data.cityID, data.weather))
    })
  })
}

export default initSocket
