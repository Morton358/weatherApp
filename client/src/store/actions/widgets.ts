import * as actionTypes from '../actions/actionTypes'
import {
  ActionRemoveWidget,
  ActionRemoveWidgetStart,
  ActionRemoveWidgetSuccess,
  ActionRemoveWidgetFailed,
  ActionGetCityWeather,
  ActionGetCityWeatherStart,
  ActionGetCityWeatherSuccess,
  ActionGetCityWeatherFailed,
  NotificationData,
} from '../../types'

export const removeWidget = (cityId: number): ActionRemoveWidget => {
  return {
    type: actionTypes.REMOVE_WIDGET_INITIAL,
    cityID: cityId,
  }
}

export const removeWidgetStart = (): ActionRemoveWidgetStart => {
  return {
    type: actionTypes.REMOVE_WIDGET_START,
  }
}

export const removeWidgetSuccess = (cityID: string): ActionRemoveWidgetSuccess => {
  return {
    type: actionTypes.REMOVE_WIDGET_SUCCESS,
    cityID,
  }
}

export const removeWidgetFailed = (error: Error): ActionRemoveWidgetFailed => {
  return {
    type: actionTypes.REMOVE_WIDGET_FAILED,
    removeWidgetError: error,
  }
}

export const getCityWeather = (cityId: number): ActionGetCityWeather => {
  return {
    type: actionTypes.GET_CITY_WEATHER_INITIAL,
    cityID: cityId,
  }
}

export const getCityWeatherStart = (): ActionGetCityWeatherStart => {
  return {
    type: actionTypes.GET_CITY_WEATHER_START,
  }
}

export const getCityWeatherSuccess = (cityData: NotificationData): ActionGetCityWeatherSuccess => {
  return {
    type: actionTypes.GET_CITY_WEATHER_SUCCESS,
    cityData,
  }
}

export const getCityWeatherFailed = (error: Error): ActionGetCityWeatherFailed => {
  return {
    type: actionTypes.GET_CITY_WEATHER_FAILED,
    getCityWeatherError: error,
  }
}
