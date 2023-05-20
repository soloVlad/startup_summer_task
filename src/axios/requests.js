import { ENDPOINTS, LOGIN_DATA, VACANCIES_PER_PAGE } from "../constants/api"
import instance from "./axios"

export const getAuth = async () => {
  const { data } = await instance.get(ENDPOINTS.LOGIN, { params: LOGIN_DATA })
  return data;
};

export const fetchVacancies = async (params) => {
  const { data } = await instance.get(ENDPOINTS.VACANCIES, {
    params: {
      count: VACANCIES_PER_PAGE,
      ...params,
    }
  });
  return data;
};

export const fetchVacancyById = async (id) => {
  const { data } = await instance.get(`${ENDPOINTS.VACANCIES}${id}/`);
  return data;
};

export const fetchFavorites = async (arrayOfId) => {
  const { data } = await instance.get(ENDPOINTS.VACANCIES, {
    params: {
      count: arrayOfId.length,
      ids: arrayOfId,
    }
  });
  return data;
};

export const fetchCatalogues = async () => {
  const { data } = await instance.get(ENDPOINTS.CATALOGUES);
  return data;
};