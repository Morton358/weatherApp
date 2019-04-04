import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../share/utility'
import {
  AppState,
  Actions,
  ActionGetResponseSuccess,
  ActionGetResponseFailed,
  ActionNotificationCityWeather,
  CityData,
} from '../types'

const initialState: AppState = {
  cities: new Map(),
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

const notificationCityWeather = (state: AppState, action: ActionNotificationCityWeather): AppState => {
  console.log(`reducers -> app.ts -> notificationCityWeather -> action.temperature is : ${action.temperature}`)
  const tempCities = new Map(state.cities)
  const cityData: CityData | undefined = tempCities.get(parseInt(action.cityID, 10))
  if (cityData !== undefined) {
    cityData.cloudPercentage = action.cloudPercentage
    cityData.rainAmount = action.rainAmount
    cityData.temperature = action.temperature
    tempCities.set(parseInt(action.cityID, 10), cityData)
  }
  return updateObject(state, {
    cities: tempCities,
  })
}

const reducer = (state = initialState, action: Actions): AppState => {
  switch (action.type) {
    case actionTypes.GET_RESPONSE_START:
      return getResponseStart(state)
    case actionTypes.GET_RESPONSE_SUCCESS:
      return getResponseSuccess(state, action)
    case actionTypes.GET_RESPONSE_FAILED:
      return getResponseFailed(state, action)
    case actionTypes.NOTIFICATION_CITY_WEATHER:
      return notificationCityWeather(state, action)
    default:
      return state
  }
}

export default reducer
