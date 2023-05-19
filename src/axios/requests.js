import { ENDPOINTS, LOGIN_DATA } from "../constants/api"
import instance from "./axios"

export const getAuth = async () => {
  const { data } = await instance.get(ENDPOINTS.LOGIN, { params: LOGIN_DATA })
  return data;
};