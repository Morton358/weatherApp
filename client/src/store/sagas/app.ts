import { put } from 'redux-saga/effects'

import { apiAxios, serverAxios } from '../../share/axios-instance'
import * as actions from '../actions/index'

export function* getCityListSaga() {
  yield put(actions.getCityListStart())
  try {
    const response = yield apiAxios.get('/api/city-list')
    const cities = response.data
    yield put(actions.getCityListSuccess(cities))
  } catch (error) {
    yield put(actions.getCityListFailed(error))
  }
}

export function* getWidgetListSaga() {
  yield put(actions.getWidgetListStart())
  try {
    const response = yield serverAxios.get('/server/widgets')
    const widgets = response.data
    yield put(actions.getWidgetListSuccess(widgets))
  } catch (error) {
    yield put(actions.getWidgetListFailed(error))
  }
}
