import axios from "axios";
import { BASE_URL, X_API_APP_ID, X_SECRET_KEY } from "../constants/api";

const instance = axios.create({
  baseURL: BASE_URL,
});

instance.interceptors.request.use((config) => {
  config.headers['X-Api-App-Id'] = X_API_APP_ID;
  config.headers['x-secret-key'] = X_SECRET_KEY;

  const token = JSON.parse(localStorage.getItem('token'))?.access_token;
  if (token) {
    console.log(token);
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default instance;