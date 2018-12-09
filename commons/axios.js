import axios from 'axios'
import { API_HOST } from '@/commons/constants'

axios.defaults.baseURL = API_HOST
axios.defaults.withCredentials = true
axios.defaults.headers.common['Content-Type'] = 'application/json'

export default axios
