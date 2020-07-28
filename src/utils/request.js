import axios from 'axios'

let request = axios.create({
  timeout: 5000,
  baseURL: `${process.env.VUE_APP_BASE_URL}`,
  method: 'GET'
})

export default request
