import * as actionTypes from './actions/actionTypes'

export interface AppState {
  response: string
  post: string
  responseToPost: string
  error: Error | null
  errorOccured: boolean
  loading: boolean
}

export type ActionGetResponses =
  | ActionGetResponseStart
  | ActionGetResponseSuccess
  | ActionGetResponseFailed
  | ActionGetResponse
export interface ActionGetResponseStart {
  type: typeof actionTypes.GET_RESPONSE_START
}
export interface ActionGetResponseSuccess {
  type: typeof actionTypes.GET_RESPONSE_SUCCESS
  data: string
}
export interface ActionGetResponseFailed {
  type: typeof actionTypes.GET_RESPONSE_FAILED
  getResponseError: Error
}
export interface ActionGetResponse {
  type: typeof actionTypes.GET_RESPONSE_INITIAL
}
