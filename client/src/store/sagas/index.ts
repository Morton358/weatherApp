import { takeEvery } from 'redux-saga/effects'

import { getResponseSaga } from './app'
import * as actionTypes from '../actions/actionTypes'

export function* watchApp() {
  yield takeEvery(actionTypes.GET_RESPONSE_INITIAL, getResponseSaga)
}
