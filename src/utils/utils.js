import { PAGES_AMOUNT, VACANCIES_PER_PAGE } from "../constants/api";

export const convertSearchParamsToObject = (searchParams) => {
  const paramsObj = {};
  searchParams.forEach((value, key) => {
    paramsObj[key] = value;
  })
  return paramsObj
};

export const getFavoritesFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('favorites')) || [];
};

export const saveFavoritesToLocalStorage = (favoritesIds) => {
  localStorage.setItem('favorites', JSON.stringify(favoritesIds));
};

export const calcAmountOfPages = (total) => {
  let amountOfPages = total / VACANCIES_PER_PAGE;
  amountOfPages = amountOfPages > PAGES_AMOUNT ? PAGES_AMOUNT : amountOfPages;
  return amountOfPages
};

export const combineParams = (params, currentPage) => {
  const combinedParams = { ...params, page: currentPage };
  const { payment_from, payment_to } = params;

  if (payment_from || payment_to) {
    combinedParams['no_agreement'] = 1;
  }

  console.log(combinedParams);

  return combinedParams;
};