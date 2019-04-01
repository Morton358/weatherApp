import { AppState } from '../store/types'

export const updateObject = (oldObject: AppState, updatedProperties: object) => {
  return {
    ...oldObject,
    ...updatedProperties,
  }
}

export const checkValidityInput = (value: string) => {
  let isValid = true
  const pattern = /^[a-zA-Z\u0080-\u024F\s\/\-\)\(\`\.\"\']+$/
  isValid = pattern.test(value) && isValid
  return isValid
}
