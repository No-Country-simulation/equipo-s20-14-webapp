import axios from 'axios'
import { getEnvVariables } from '../helpers/getEnvVariables'
import { useAuthStore } from '../store/auth'

const { VITE_API_URL } = getEnvVariables();

const claraApi = axios.create({
  baseURL: VITE_API_URL,
  withCredentials: true
});

claraApi.interceptors.request.use(config => {

  const token = useAuthStore.getState().token
  config.headers = {
    Authorization: `Bearer ${token}`
  }

  return config
});

export default claraApi
