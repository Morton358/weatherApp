import * as actionTypes from './actionTypes'
import { ActionGetResponse, ActionGetResponseStart, ActionGetResponseSuccess, ActionGetResponseFailed } from '../types'

export const getResponseStart = (): ActionGetResponseStart => {
  return {
    type: actionTypes.GET_RESPONSE_START,
  }
}
export const getResponseSuccess = (data: string): ActionGetResponseSuccess => {
  return {
    type: actionTypes.GET_RESPONSE_SUCCESS,
    data: data,
  }
}

export const getResponseFailed = (error: Error): ActionGetResponseFailed => {
  return {
    type: actionTypes.GET_RESPONSE_FAILED,
    getResponseError: error,
  }
}

export const getResponse = (): ActionGetResponse => {
  return {
    type: actionTypes.GET_RESPONSE_INITIAL,
  }
}
