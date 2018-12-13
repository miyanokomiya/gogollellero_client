import axios from 'axios'

axios.defaults.baseURL = process.env.baseUrl
axios.defaults.withCredentials = true
axios.defaults.headers.common['Content-Type'] = 'application/json'

export default axios
