import axios from 'axios'

export const serverAxios = axios.create({
  baseURL: process.env.REACT_APP_SERVER_HOST,
})

export const apiAxios = axios.create({
  baseURL: process.env.REACT_APP_API_HOST,
  headers: {
    Authorization: process.env.REACT_APP_API_AUTHORIZATION,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})
