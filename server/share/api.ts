import dotenv from 'dotenv'

dotenv.config()

export const apiHeaders = {
  Authorization: process.env.API_AUTHORIZATION,
  Accept: 'application/json',
  'Content-Type': 'application/json',
}
