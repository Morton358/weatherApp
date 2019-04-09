import * as actionTypes from '../actions/actionTypes'
import { ActionAddWidget } from '../../types'

export const addWidget = (cityId: number): ActionAddWidget => {
  return {
    type: actionTypes.ADD_WIDGET,
    cityID: cityId,
  }
}
