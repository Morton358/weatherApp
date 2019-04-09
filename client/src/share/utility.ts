import { RootState } from '../types'

export const updateObject = (oldObject: RootState, updatedProperties: object) => {
  return {
    ...oldObject,
    ...updatedProperties,
  }
}
