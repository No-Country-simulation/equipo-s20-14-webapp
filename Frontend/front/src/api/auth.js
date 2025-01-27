import axios from 'axios'

export const loginRequest = async (email, password) => {
  return axios.post('https://clara-ukyz.onrender.com/auth/login', {
    email,
    password
  })
}
export const registerRequest = async (email, password, username, contact) => {
  return axios.post('https://clara-ukyz.onrender.com/auth/register', {
    email,
    password,
    username,
    contact
  })
}
