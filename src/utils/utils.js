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

export const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0;
}

export const removeFalsyParams = (paramsObj) => {
  const filteredObj = {};
  for (let param in paramsObj) {
    if (typeof paramsObj[param] === 'object') {
      const filteredProps = removeFalsyParams(paramsObj[param]);
      filteredObj[param] = { ...filteredProps };
    }
    else if (paramsObj[param] || paramsObj[param] === 0) filteredObj[param] = paramsObj[param];
  }
  return filteredObj;
}