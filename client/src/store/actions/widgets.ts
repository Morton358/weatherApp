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

export const removeWidget = (cityId: number): ActionRemoveWidget => ({
  type: actionTypes.REMOVE_WIDGET_INITIAL,
  cityID: cityId,
})

export const removeWidgetStart = (): ActionRemoveWidgetStart => ({
  type: actionTypes.REMOVE_WIDGET_START,
})

export const removeWidgetSuccess = (cityID: string): ActionRemoveWidgetSuccess => ({
  type: actionTypes.REMOVE_WIDGET_SUCCESS,
  cityID,
})

export const removeWidgetFailed = (error: Error): ActionRemoveWidgetFailed => ({
  type: actionTypes.REMOVE_WIDGET_FAILED,
  removeWidgetError: error,
})

export const getCityWeather = (cityId: number): ActionGetCityWeather => ({
  type: actionTypes.GET_CITY_WEATHER_INITIAL,
  cityID: cityId,
})

export const getCityWeatherStart = (): ActionGetCityWeatherStart => ({
  type: actionTypes.GET_CITY_WEATHER_START,
})

export const getCityWeatherSuccess = (cityData: NotificationData): ActionGetCityWeatherSuccess => ({
  type: actionTypes.GET_CITY_WEATHER_SUCCESS,
  cityData,
})

export const getCityWeatherFailed = (error: Error): ActionGetCityWeatherFailed => ({
  type: actionTypes.GET_CITY_WEATHER_FAILED,
  getCityWeatherError: error,
})
