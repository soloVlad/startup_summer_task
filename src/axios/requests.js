import { ENDPOINTS, LOGIN_DATA, VACANCIES_PER_PAGE } from "../constants/api"
import instance from "./axios"

export const getAuth = async () => {
  const { data } = await instance.get(ENDPOINTS.LOGIN, { params: LOGIN_DATA })
  return data;
};

export const getVacancies = async (params) => {
  const { data } = await instance.get(ENDPOINTS.VACANCIES, {
    params: {
      count: VACANCIES_PER_PAGE,
      ...params,
    }
  });
  return data;
}