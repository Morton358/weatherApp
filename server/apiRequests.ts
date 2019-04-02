import dotenv from 'dotenv'
import axios from 'axios'

dotenv.config()

export const subscribeToCity = async (cityID: string): Promise<boolean> => {
  console.log(`this is my server uri from .env.development ${process.env.SERVER_URI}`)

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
      data: { cityId: parseInt(cityID, 10), url: `${process.env.SERVER_URI}/api/weather/${cityID}` },
    })
    if (resp.data) {
      result = true
    }
    console.log(`response data from subscribeToCity: ${resp.data}`)
  } catch (error) {
    console.error(error)
    result = false
  }
  return result
}
