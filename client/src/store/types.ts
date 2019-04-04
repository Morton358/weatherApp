import { Dispatch } from 'react'

import * as actionTypes from './actions/actionTypes'

export interface AppState {
  cities: Map<number, CityData>
  response: string
  post: string
  responseToPost: string
  error: Error | null
  errorOccured: boolean
  loading: boolean
}

export interface AppProps extends AppState {
  onGetRequest: () => Dispatch<ActionGetResponse>
}

export interface WeatherData {
  cloudPercentage: number
  rainAmount: number
  temperature: number
}

export interface NotificationData {
  cityID: string
  weather: WeatherData
}

export interface CityData {
  cloudPercentage: number
  rainAmount: number
  temperature: number
}

export type Actions = ActionGetResponses | ActionNotificationCityWeather

type ActionGetResponses =
  | ActionGetResponseStart
  | ActionGetResponseSuccess
  | ActionGetResponseFailed
  | ActionGetResponse
export interface ActionGetResponseStart {
  type: typeof actionTypes.GET_RESPONSE_START
}
export interface ActionGetResponseSuccess {
  type: typeof actionTypes.GET_RESPONSE_SUCCESS
  data: string
}
export interface ActionGetResponseFailed {
  type: typeof actionTypes.GET_RESPONSE_FAILED
  getResponseError: Error
}
export interface ActionGetResponse {
  type: typeof actionTypes.GET_RESPONSE_INITIAL
}

export interface ActionNotificationCityWeather {
  type: typeof actionTypes.NOTIFICATION_CITY_WEATHER
  cityID: string
  cloudPercentage: number
  rainAmount: number
  temperature: number
}
