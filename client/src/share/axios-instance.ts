import axios from 'axios'

console.log(`I am inside axios instance, here is the react app server host: ${process.env.REACT_APP_SERVER_HOST}`)

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_HOST,
})

export default instance
