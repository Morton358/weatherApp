import { WeatherData, RootState, NotificationData } from './../../types'
import reducer from './app'
import * as actionTypes from '../actions/actionTypes'
// @ts-ignore
import 'map.prototype.tojson'
import { cloneObj } from '../../share/utility'

const initialState: RootState = {
  cities: [],
  selectedCities: new Map(),
  error: null,
  errorOccured: false,
  loading: false,
}

const weather1: WeatherData = {
  temperature: 25.0,
  cloudPercentage: 10,
  rainAmount: 5.0,
}

const weather2: WeatherData = {
  temperature: 15.0,
  cloudPercentage: 34,
  rainAmount: 0.0,
}

const createNotificationData = (number: number, weather: WeatherData) => ({
  cityID: `11111${number}`,
  weather,
})

const createCityMap = (existingMap: Map<number, WeatherData>, data: NotificationData) => {
  const tempMap = new Map(existingMap)
  const citiesData = cloneObj(data)
  Object.entries(citiesData).forEach(([cityID, weather]) => {
    tempMap.set(parseInt(cityID, 10), { ...(weather as WeatherData) })
  })
  return tempMap
}

const cityData1 = createNotificationData(1, weather1)
const cityData2 = createNotificationData(2, weather2)

const cityMap1 = createCityMap(new Map(), cityData1)
const cityMap2 = createCityMap(cityMap1, cityData2)

describe('root reducer', () => {
  it('should add weather widget', () => {
    expect(
      reducer(initialState, {
        type: actionTypes.ADD_WIDGET_SUCCESS,
        cityData: cityData1,
      })
    ).toEqual({
      cities: [],
      selectedCities: cityMap1,
      error: null,
      errorOccured: false,
      loading: false,
    })

    expect(
      reducer(
        {
          cities: [],
          selectedCities: cityMap1,
          error: null,
          errorOccured: false,
          loading: false,
        },
        {
          type: actionTypes.ADD_WIDGET_SUCCESS,
          cityData: cityData2,
        }
      )
    ).toEqual({
      cities: [],
      selectedCities: cityMap2,
      error: null,
      errorOccured: false,
      loading: false,
    })
  })
})
