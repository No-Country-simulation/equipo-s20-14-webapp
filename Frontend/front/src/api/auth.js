import axios from 'axios'

export const loginRequest = async (email, password) => {
  return axios.post('https://clara-ukyz.onrender.com/auth/login', {
    email,
    password
  })
}
