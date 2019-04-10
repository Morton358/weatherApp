// @ts-ignore
import 'map.prototype.tojson'

import * as actionTypes from '../actions/actionTypes'
import { updateObject, cloneObj } from '../../share/utility'
import {
  RootState,
  Actions,
  ActionGetCityListSuccess,
  ActionGetCityListFailed,
  ActionNotificationCityWeather,
  CityData,
  ActionGetWidgetListFailed,
  ActionGetWidgetListSuccess,
  ActionAddWidgetSuccess,
  ActionAddWidgetFailed,
} from '../../types'

const initialState: RootState = {
  cities: [],
  selectedCities: new Map(),
  error: null,
  errorOccured: false,
  loading: false,
}

const getCityListStart = (state: RootState): RootState => {
  return updateObject(state, { loading: true })
}

const getCityListSuccess = (state: RootState, action: ActionGetCityListSuccess): RootState => {
  console.log('TCL: reducer -> getCityListSuccess -> cities', action.cities)
  return updateObject(state, {
    cities: action.cities,
    error: null,
    errorOccured: false,
    loading: false,
  })
}

const getCityListFailed = (state: RootState, action: ActionGetCityListFailed): RootState => {
  return updateObject(state, {
    error: action.getCityListError,
    errorOccured: true,
    loading: false,
  })
}

const notificationCityWeather = (state: RootState, action: ActionNotificationCityWeather): RootState => {
  console.log(`reducers -> app.ts -> notificationCityWeather -> action.temperature is : ${action.temperature}`)
  const tempCities = new Map(state.selectedCities)
  console.log('TCL: tempCities', tempCities)
  const cityData: CityData | undefined = tempCities.get(parseInt(action.cityID, 10))
  if (cityData !== undefined) {
    cityData.cloudPercentage = action.cloudPercentage
    cityData.rainAmount = action.rainAmount
    cityData.temperature = action.temperature
    tempCities.set(parseInt(action.cityID, 10), cityData)
  }
  return updateObject(state, {
    selectedCities: tempCities,
  })
}

const getWidgetListStart = (state: RootState): RootState => {
  return updateObject(state, { loading: true })
}

const getWidgetListSuccess = (state: RootState, action: ActionGetWidgetListSuccess): RootState => {
  console.log('TCL: reducer -> getWidgetListSuccess -> widgets', action.widgets)
  const tempCities = new Map(state.selectedCities)
  const re = new RegExp('^[0-9]{6,10}$', 'gm')
  if (Object.keys(action.widgets).length !== 0) {
    Object.entries(action.widgets).forEach(([key, value]) => {
      if (re.test(key)) {
        tempCities.set(parseInt(key, 10), { ...value })
      } else {
        console.error('app reducer -> getWidgetListSuccess -> bad key in widgets obj', key)
      }
    })
  }
  return updateObject(state, {
    selectedCities: tempCities,
    error: null,
    errorOccured: false,
    loading: false,
  })
}

const getWidgetListFailed = (state: RootState, action: ActionGetWidgetListFailed): RootState => {
  return updateObject(state, {
    error: action.getWidgetListError,
    errorOccured: true,
    loading: false,
  })
}

const addWidgetStart = (state: RootState): RootState => {
  return updateObject(state, { loading: true })
}

const addWidgetSuccess = (state: RootState, action: ActionAddWidgetSuccess): RootState => {
  console.log('TCL: reducer -> addWidgetSuccess -> cityData', action.cityData)
  const citiesData = cloneObj(action.cityData)
  const tempCities = new Map(state.selectedCities)
  Object.entries(citiesData).forEach(([cityID, weather]) => {
    tempCities.set(parseInt(cityID, 10), { ...(weather as CityData) })
  })
  console.log('TCL: tempCities', tempCities)
  return updateObject(state, {
    selectedCities: tempCities,
    error: null,
    errorOccured: false,
    loading: false,
  })
}

const addWidgetFailed = (state: RootState, action: ActionAddWidgetFailed): RootState => {
  return updateObject(state, {
    error: action.addWidgetError,
    errorOccured: true,
    loading: false,
  })
}

const reducer = (state = initialState, action: Actions): RootState => {
  switch (action.type) {
    case actionTypes.GET_CITY_LIST_START:
      return getCityListStart(state)
    case actionTypes.GET_CITY_LIST_SUCCESS:
      return getCityListSuccess(state, action)
    case actionTypes.GET_CITY_LIST_FAILED:
      return getCityListFailed(state, action)
    case actionTypes.NOTIFICATION_CITY_WEATHER:
      return notificationCityWeather(state, action)
    case actionTypes.ADD_WIDGET_START:
      return addWidgetStart(state)
    case actionTypes.ADD_WIDGET_SUCCESS:
      return addWidgetSuccess(state, action)
    case actionTypes.ADD_WIDGET_FAILED:
      return addWidgetFailed(state, action)
    case actionTypes.GET_WIDGET_LIST_START:
      return getWidgetListStart(state)
    case actionTypes.GET_WIDGET_LIST_SUCCESS:
      return getWidgetListSuccess(state, action)
    case actionTypes.GET_WIDGET_LIST_FAILED:
      return getWidgetListFailed(state, action)
    default:
      return state
  }
}

export default reducer
