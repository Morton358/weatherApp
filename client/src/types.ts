import { AppProps } from './types'
import { Dispatch } from 'react'

import * as actionTypes from './store/actions/actionTypes'

export interface RootState {
  cities: City[]
  selectedCities: Map<number, CityData>
  error: Error | null
  errorOccured: boolean
  loading: boolean
}

export type AppProps = AppDispatchProps & AppStateProps & AppOwnProps
interface AppDispatchProps {
  onGetCityList: () => Dispatch<ActionGetCityList>
  onGetListOfWidgets: () => Dispatch<ActionGetWidgetList>
}
interface AppStateProps {
  cities: City[]
  selectedCities: Map<number, CityData>
  error: Error | null
  errorOccured: boolean
  loading: boolean
}
interface AppOwnProps {}

export type AddWidgetProps = AddWidgetDispatchProps & AddWidgetStateProps & AddWidgetOwnProps
interface AddWidgetDispatchProps {
  onAddWidget: (cityId: string) => Dispatch<ActionAddWidget>
}
interface AddWidgetStateProps {
  cities: City[]
}
interface AddWidgetOwnProps {}

export interface WeatherData {
  cloudPercentage: number
  rainAmount: number
  temperature: number
}

export interface NotificationData {
  cityID: string
  weather: WeatherData
}

export interface City {
  id: number
  name: string
}

export interface CityData {
  cloudPercentage: number
  rainAmount: number
  temperature: number
}

export type Actions =
  | ActionNotificationCityWeather
  | ActionGetCityListStart
  | ActionGetCityListSuccess
  | ActionGetCityListFailed
  | ActionGetCityList
  | ActionAddWidget
  | ActionAddWidgetStart
  | ActionAddWidgetSuccess
  | ActionAddWidgetFailed
  | ActionGetWidgetListStart
  | ActionGetWidgetListSuccess
  | ActionGetWidgetListFailed
  | ActionGetWidgetList

export interface ActionGetCityListStart {
  type: typeof actionTypes.GET_CITY_LIST_START
}
export interface ActionGetCityListSuccess {
  type: typeof actionTypes.GET_CITY_LIST_SUCCESS
  cities: Array<City>
}
export interface ActionGetCityListFailed {
  type: typeof actionTypes.GET_CITY_LIST_FAILED
  getCityListError: Error
}
export interface ActionGetCityList {
  type: typeof actionTypes.GET_CITY_LIST_INITIAL
}

export interface ActionNotificationCityWeather {
  type: typeof actionTypes.NOTIFICATION_CITY_WEATHER
  cityID: string
  cloudPercentage: number
  rainAmount: number
  temperature: number
}
export interface ActionAddWidget {
  type: typeof actionTypes.ADD_WIDGET_INITIAL
  cityID: string
}
export interface ActionAddWidgetStart {
  type: typeof actionTypes.ADD_WIDGET_START
}
export interface ActionAddWidgetSuccess {
  type: typeof actionTypes.ADD_WIDGET_SUCCESS
  cityData: NotificationData
}
export interface ActionAddWidgetFailed {
  type: typeof actionTypes.ADD_WIDGET_FAILED
  addWidgetError: Error
}

export interface ActionGetWidgetListStart {
  type: typeof actionTypes.GET_WIDGET_LIST_START
}
export interface ActionGetWidgetListSuccess {
  type: typeof actionTypes.GET_WIDGET_LIST_SUCCESS
  widgets: object
}
export interface ActionGetWidgetListFailed {
  type: typeof actionTypes.GET_WIDGET_LIST_FAILED
  getWidgetListError: Error
}
export interface ActionGetWidgetList {
  type: typeof actionTypes.GET_WIDGET_LIST_INITIAL
}
