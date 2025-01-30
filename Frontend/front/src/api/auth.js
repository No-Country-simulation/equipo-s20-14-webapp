import axios from "../libs/axios";

export const loginRequest = async (email, password) => {
  return axios.post("/auth/login", {
    email,
    password,
  });
};

export const registerRequest = async (email, password, username, contact) => {
  return axios.post("/auth/register", {
    email,
    password,
    username,
    contact,
  });
};
