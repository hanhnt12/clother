import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: process.env.API_BASE_URL || `http://localhost:3000/api/`,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token, Origin, Authorization',
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
}
