import { put } from 'redux-saga/effects'

import { serverAxios } from '../../share/axios-instance'
import * as actions from '../actions/index'
import { ActionAddWidget } from './../../types'

export function* addWidgetSaga(action: ActionAddWidget) {
  yield put(actions.addWidgetStart())
  try {
    const cityID = action.cityID
    const serverResp = yield serverAxios.get(`/server/add/${cityID}`)
    yield serverAxios.get(`/server/subscribe/${cityID}`)
    yield put(actions.addWidgetSuccess(serverResp.data))
  } catch (error) {
    yield put(actions.getCityListFailed(error))
  }
}
