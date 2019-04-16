import dotenv from 'dotenv'
import axios from 'axios'

import { apiHeaders } from '../share/api'

dotenv.config()

export const weather = async (cityID: string): Promise<object> => {
  let result = {}
  try {
    const resp = await axios({
      method: 'get',
      baseURL: process.env.API_BASE_URL,
      url: `/weather/${cityID}`,
      headers: apiHeaders,
    })
    if (resp.data) {
      result = resp.data
    }
  } catch (error) {
    console.error(error)
    result = {}
  }
  return result
}
