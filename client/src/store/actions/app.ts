import * as actionTypes from './actionTypes'
import {
  ActionGetCityList,
  ActionGetCityListStart,
  ActionGetCityListSuccess,
  ActionGetCityListFailed,
  WeatherData,
  ActionNotificationCityWeather,
  City,
  ActionGetWidgetListStart,
  ActionGetWidgetList,
  ActionGetWidgetListSuccess,
  ActionGetWidgetListFailed,
} from '../../types'

export const getCityListStart = (): ActionGetCityListStart => {
  return {
    type: actionTypes.GET_CITY_LIST_START,
  }
}
export const getCityListSuccess = (cities: City[]): ActionGetCityListSuccess => {
  return {
    type: actionTypes.GET_CITY_LIST_SUCCESS,
    cities,
  }
}

export const getCityListFailed = (error: Error): ActionGetCityListFailed => {
  return {
    type: actionTypes.GET_CITY_LIST_FAILED,
    getCityListError: error,
  }
}

export const getCityList = (): ActionGetCityList => {
  return {
    type: actionTypes.GET_CITY_LIST_INITIAL,
  }
}

export const notificationCityWeather = (cityID: string, weather: WeatherData): ActionNotificationCityWeather => {
  return {
    type: actionTypes.NOTIFICATION_CITY_WEATHER,
    cityID,
    cloudPercentage: weather.cloudPercentage,
    rainAmount: weather.rainAmount,
    temperature: weather.temperature,
  }
}

export const getWidgetListStart = (): ActionGetWidgetListStart => {
  return {
    type: actionTypes.GET_WIDGET_LIST_START,
  }
}
export const getWidgetListSuccess = (widgets: object): ActionGetWidgetListSuccess => {
  return {
    type: actionTypes.GET_WIDGET_LIST_SUCCESS,
    widgets,
  }
}

export const getWidgetListFailed = (error: Error): ActionGetWidgetListFailed => {
  return {
    type: actionTypes.GET_WIDGET_LIST_FAILED,
    getWidgetListError: error,
  }
}

export const getWidgetList = (): ActionGetWidgetList => {
  return {
    type: actionTypes.GET_WIDGET_LIST_INITIAL,
  }
}
