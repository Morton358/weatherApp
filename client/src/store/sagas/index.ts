import { takeEvery, all } from 'redux-saga/effects'

import { getCityListSaga, getWidgetListSaga } from './app'
import { addWidgetSaga } from './addWidget'
import { removeWidgetSaga, getCityWeatherSaga } from './widgets'
import * as actionTypes from '../actions/actionTypes'

export function* watchApp() {
  yield all([
    takeEvery(actionTypes.GET_WIDGET_LIST_INITIAL, getWidgetListSaga),
    takeEvery(actionTypes.GET_CITY_LIST_INITIAL, getCityListSaga),
    takeEvery(actionTypes.ADD_WIDGET_INITIAL, addWidgetSaga),
    takeEvery(actionTypes.REMOVE_WIDGET_INITIAL, removeWidgetSaga),
    takeEvery(actionTypes.GET_CITY_WEATHER_INITIAL, getCityWeatherSaga),
  ])
}
