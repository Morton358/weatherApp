import dotenv from 'dotenv'
import axios from 'axios'

dotenv.config()

export const subscribe = async (cityID: string): Promise<boolean> => {
  let result = false
  try {
    const resp = await axios({
      method: 'post',
      baseURL: process.env.API_BASE_URL,
      url: '/hooks/weather/subscribe',
      timeout: 10000,
      headers: {
        Authorization: process.env.API_AUTHORIZATION,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: { cityId: parseInt(cityID, 10), url: `${process.env.SERVER_URI}/api/weather/notification/${cityID}` },
    })
    if (resp.data) {
      result = true
    }
  } catch (error) {
    console.error(error)
  }
  return result
}
