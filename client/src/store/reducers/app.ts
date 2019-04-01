import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../share/utility'
import { AppState, ActionGetResponses, ActionGetResponseSuccess, ActionGetResponseFailed } from '../types'

const initialState: AppState = {
  response: '',
  post: '',
  responseToPost: '',
  error: null,
  errorOccured: false,
  loading: false,
}

const getResponseStart = (state: AppState): AppState => {
  return updateObject(state, { loading: true })
}

const getResponseSuccess = (state: AppState, action: ActionGetResponseSuccess): AppState => {
  return updateObject(state, {
    response: action.data,
    error: null,
    errorOccured: false,
    loading: false,
  })
}

const getResponseFailed = (state: AppState, action: ActionGetResponseFailed): AppState => {
  return updateObject(state, {
    error: action.getResponseError,
    errorOccured: true,
    loading: false,
  })
}

const reducer = (state = initialState, action: ActionGetResponses): AppState => {
  switch (action.type) {
    case actionTypes.GET_RESPONSE_START:
      return getResponseStart(state)
    case actionTypes.GET_RESPONSE_SUCCESS:
      return getResponseSuccess(state, action)
    case actionTypes.GET_RESPONSE_FAILED:
      return getResponseFailed(state, action)
    default:
      return state
  }
}

export default reducer
