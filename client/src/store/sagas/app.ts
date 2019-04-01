import { put } from 'redux-saga/effects'

import axios from '../../share/axios-instance'
import * as actions from '../actions/index'

export function* getResponseSaga() {
  yield put(actions.getResponseStart())
  try {
    const response = yield axios.get('/api')
    const data = response.data
    yield put(actions.getResponseSuccess(data))
  } catch (error) {
    yield put(actions.getResponseFailed(error))
  }
}
