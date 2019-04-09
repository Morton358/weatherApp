import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../share/utility'
import {
  RootState,
  Actions,
  ActionGetCityListSuccess,
  ActionGetCityListFailed,
  ActionNotificationCityWeather,
  CityData,
  ActionAddWidget,
  ActionGetWidgetListFailed,
  ActionGetWidgetListSuccess,
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

const addWidget = (state: RootState, action: ActionAddWidget): RootState => {
  if (state.selectedCities.has(action.cityID)) {
    return updateObject(state, {
      error: new Error('Choosen city already added !'),
      errorOccured: true,
    })
  } else {
    console.log('I am sending add widget to server')
    return state
  }
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
    case actionTypes.ADD_WIDGET:
      return addWidget(state, action)
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
