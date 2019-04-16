import * as actionTypes from '../actions/actionTypes'
import {
  ActionAddWidget,
  ActionAddWidgetStart,
  NotificationData,
  ActionAddWidgetSuccess,
  ActionAddWidgetFailed,
} from '../../types'

export const addWidget = (cityId: string): ActionAddWidget => ({ type: actionTypes.ADD_WIDGET_INITIAL, cityID: cityId })

export const addWidgetStart = (): ActionAddWidgetStart => ({ type: actionTypes.ADD_WIDGET_START })

export const addWidgetSuccess = (cityData: NotificationData): ActionAddWidgetSuccess => ({
  type: actionTypes.ADD_WIDGET_SUCCESS,
  cityData,
})

export const addWidgetFailed = (error: Error): ActionAddWidgetFailed => ({
  type: actionTypes.ADD_WIDGET_FAILED,
  addWidgetError: error,
})
