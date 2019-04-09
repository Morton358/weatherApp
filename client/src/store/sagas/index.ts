import { takeEvery, all } from 'redux-saga/effects'

import { getCityListSaga, getWidgetListSaga } from './app'
import * as actionTypes from '../actions/actionTypes'

export function* watchApp() {
  yield all([
    takeEvery(actionTypes.GET_CITY_LIST_INITIAL, getCityListSaga),
    takeEvery(actionTypes.GET_WIDGET_LIST_INITIAL, getWidgetListSaga),
  ])
}
