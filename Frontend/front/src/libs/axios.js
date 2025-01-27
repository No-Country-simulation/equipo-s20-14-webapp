import axios from 'axios'
import { useAuthStore } from '../store/auth'

const authApli = axios.create({
  baseURL: "https://clara-ukyz.onrender.com",
  withCredentials: true
})

authApli.interceptors.request.use(config => {
  const token = useAuthStore.getState().token
  config.headers = {
    Authorization: `Bearer ${token}`
  }
  return config
})
export default authApli
