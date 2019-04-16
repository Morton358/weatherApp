import dotenv from 'dotenv'
import axios from 'axios'

import { apiHeaders } from '../share/api'

dotenv.config()

export const unsubscribe = async (cityID: string): Promise<boolean> => {
  let result = false
  try {
    const resp = await axios({
      method: 'post',
      baseURL: process.env.API_BASE_URL,
      url: `/hooks/weather/unsubscribe/${cityID}`,
      headers: apiHeaders,
    })
    if (resp.data) {
      result = true
    }
  } catch (error) {
    console.error(error)
    result = false
  }
  return result
}
