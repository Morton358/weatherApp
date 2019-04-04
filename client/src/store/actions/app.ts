import * as actionTypes from './actionTypes'
import {
  ActionGetResponse,
  ActionGetResponseStart,
  ActionGetResponseSuccess,
  ActionGetResponseFailed,
  WeatherData,
  ActionNotificationCityWeather,
} from '../types'

export const getResponseStart = (): ActionGetResponseStart => {
  return {
    type: actionTypes.GET_RESPONSE_START,
  }
}
export const getResponseSuccess = (data: string): ActionGetResponseSuccess => {
  return {
    type: actionTypes.GET_RESPONSE_SUCCESS,
    data: data,
  }
}

export const getResponseFailed = (error: Error): ActionGetResponseFailed => {
  return {
    type: actionTypes.GET_RESPONSE_FAILED,
    getResponseError: error,
  }
}

export const getResponse = (): ActionGetResponse => {
  return {
    type: actionTypes.GET_RESPONSE_INITIAL,
  }
}

export const notificationCityWeather = (cityID: string, weather: WeatherData): ActionNotificationCityWeather => {
  console.log(
    `actions -> app.ts -> notificationCityWeather -> I am receive the cityID: ${cityID} and weather: ${weather}, weather temperature is: ${
      weather.temperature
    }`
  )
  return {
    type: actionTypes.NOTIFICATION_CITY_WEATHER,
    cityID,
    cloudPercentage: weather.cloudPercentage,
    rainAmount: weather.rainAmount,
    temperature: weather.temperature,
  }
}
