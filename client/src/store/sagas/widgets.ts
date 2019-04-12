import { put } from 'redux-saga/effects'

import { serverAxios } from '../../share/axios-instance'
import * as actions from '../actions/index'
import { ActionRemoveWidget, ActionGetCityWeather } from './../../types'

export function* removeWidgetSaga(action: ActionRemoveWidget) {
  yield put(actions.removeWidgetStart())
  try {
    const cityID = action.cityID.toString()
    const serverResp = yield serverAxios.get(`/server/remove/${cityID}`)
    console.log('sagas -> removeWidgetSaga -> serverResp:')
    console.log(serverResp.data)
    yield serverAxios.get(`/server/unsubscribe/${cityID}`)
    yield put(actions.removeWidgetSuccess(cityID))
  } catch (error) {
    yield put(actions.removeWidgetFailed(error))
  }
}

export function* getCityWeatherSaga(action: ActionGetCityWeather) {
  yield put(actions.getCityWeatherStart())
  try {
    const cityID = action.cityID.toString()
    const serverResp = yield serverAxios.get(`/server/weather/${cityID}`)
    console.log('sagas -> getCityWeatherSaga -> serverResp:')
    console.log(serverResp.data)
    yield put(actions.getCityWeatherSuccess(serverResp.data))
  } catch (error) {
    yield put(actions.getCityWeatherFailed(error))
  }
}
