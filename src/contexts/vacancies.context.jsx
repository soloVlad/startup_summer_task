import { createContext, useContext, useEffect, useReducer } from "react";
import { useSearchParams } from "react-router-dom";

import { fetchCatalogues, fetchVacancies } from "../axios/requests";

import { createAction } from "../utils/reducer/reducer.utils";
import {
  calcAmountOfPages,
  combineParams,
  convertSearchParamsToObject,
  getFavoritesFromLocalStorage,
  isEmptyObject,
  saveFavoritesToLocalStorage
} from "../utils/utils";
import { AuthContext } from "./auth.context";

const VACANCIES_ACTION_TYPES = {
  SET_VACANCIES: 'SET_VACANCIES',
  SET_IS_LOADING: 'SET_IS_LOADING',
  SET_FAVORITES: 'SET_FAVORITES',
  SET_PARAMS: 'SET_PARAMS',
  SET_FILTERS: 'SET_FILTERS',
  SET_QUERY: 'SET_QUERY',
  SET_CATALOGUES: 'SET_CATALOGUES',
  SET_PAGES_AMOUNT: 'SET_PAGES_AMOUNT',
  SET_CURRENT_PAGE: 'SET_CURRENT_PAGE',
};

const INITIAL_STATE = {
  vacancies: [],
  isLoading: false,
  favoritesIds: [],
  params: '',
  filters: '',
  query: '',
  catalogues: [],
  pagesAmount: 0,
  currentPage: 0,
};

const vacanciesReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case VACANCIES_ACTION_TYPES.SET_VACANCIES:
      return {
        ...state,
        ...payload
      };
    case VACANCIES_ACTION_TYPES.SET_IS_LOADING:
      return {
        ...state,
        isLoading: payload,
      };
    case VACANCIES_ACTION_TYPES.SET_FAVORITES:
      return {
        ...state,
        ...payload,
      };
    case VACANCIES_ACTION_TYPES.SET_PARAMS:
      return {
        ...state,
        params: { ...payload },
      };
    case VACANCIES_ACTION_TYPES.SET_FILTERS:
      return {
        ...state,
        filters: { ...payload },
      };
    case VACANCIES_ACTION_TYPES.SET_QUERY:
      return {
        ...state,
        query: payload,
      };
    case VACANCIES_ACTION_TYPES.SET_CATALOGUES:
      return {
        ...state,
        catalogues: [...payload],
      };
    case VACANCIES_ACTION_TYPES.SET_PAGES_AMOUNT:
      return {
        ...state,
        pagesAmount: payload,
      };
    case VACANCIES_ACTION_TYPES.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: payload,
      };
    default:
      throw new Error(`Unhandled type ${type} in vacanciesReducer`);
  };
};

export const VacanciesContext = createContext({
  ...INITIAL_STATE,
  isFavorite: () => { },
  addFavorite: () => { },
  deleteFavorite: () => { },
  updateParams: () => { },
  updateFilters: () => { },
  updateQuery: () => { },
  updateCurrentPage: () => { }
});

export const VacanciesProvider = ({ children }) => {
  const { token } = useContext(AuthContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [state, dispatch] = useReducer(vacanciesReducer, INITIAL_STATE);
  const {
    vacancies,
    isLoading,
    favoritesIds,
    params,
    filters,
    query,
    catalogues,
    pagesAmount,
    currentPage
  } = state;


  const loadVacancies = async () => {
    if (!token) return;

    setSearchParams({ ...convertSearchParamsToObject(searchParams), currentPage: currentPage + 1 });

    dispatch(createAction(VACANCIES_ACTION_TYPES.SET_IS_LOADING, true));
    const combinedParams = combineParams(params, currentPage);
    const { objects: vacancies, total } = await fetchVacancies(combinedParams);
    const payload = { vacancies };
    const amountOfPages = calcAmountOfPages(total);

    dispatch(createAction(VACANCIES_ACTION_TYPES.SET_VACANCIES, payload));
    dispatch(createAction(VACANCIES_ACTION_TYPES.SET_PAGES_AMOUNT, amountOfPages));
    dispatch(createAction(VACANCIES_ACTION_TYPES.SET_IS_LOADING, false));
  };

  useEffect(() => {
    loadVacancies();
  }, [params, currentPage, token]);

  useEffect(() => {
    const savedFavorites = getFavoritesFromLocalStorage();
    const payload = { favoritesIds: savedFavorites };
    dispatch(createAction(VACANCIES_ACTION_TYPES.SET_FAVORITES, payload));
  }, []);

  useEffect(() => {
    const loadCatalogues = async () => {
      const fetchedCatalogues = await fetchCatalogues();
      dispatch(createAction(VACANCIES_ACTION_TYPES.SET_CATALOGUES, fetchedCatalogues));
    };

    loadCatalogues();
  }, []);

  const updateFavorites = (favoritesIds) => {
    const payload = { favoritesIds };
    dispatch(createAction(VACANCIES_ACTION_TYPES.SET_FAVORITES, payload));
  }

  const addFavorite = (id) => {
    const newFavoritesIds = [...favoritesIds, id];
    saveFavoritesToLocalStorage(newFavoritesIds);
    updateFavorites(newFavoritesIds);
  };

  const deleteFavorite = (id) => {
    const newFavoritesIds = favoritesIds.filter(favoriteId => favoriteId !== id);
    saveFavoritesToLocalStorage(newFavoritesIds);
    updateFavorites(newFavoritesIds);
  };

  const isFavorite = (id) => {
    return favoritesIds.includes(id);
  }

  const updateFilters = (newFilters) => {
    dispatch(createAction(VACANCIES_ACTION_TYPES.SET_FILTERS, newFilters));
  };

  const updateQuery = (newQuery) => {
    dispatch(createAction(VACANCIES_ACTION_TYPES.SET_QUERY, newQuery));
  };

  const updateParams = (newParams = {}) => {
    const params = {
      keyword: query,
    };

    const paramsToAdd = isEmptyObject(newParams) ? filters : newParams;
    Object.assign(params, paramsToAdd);

    const preparedParams = {};
    for (let param in params) {
      if (params[param]) preparedParams[param] = params[param];
    }
    setSearchParams(preparedParams);
    dispatch(createAction(VACANCIES_ACTION_TYPES.SET_PARAMS, preparedParams));
    dispatch(createAction(VACANCIES_ACTION_TYPES.SET_CURRENT_PAGE, INITIAL_STATE.currentPage));
  };

  const updateCurrentPage = (page) => {
    dispatch(createAction(VACANCIES_ACTION_TYPES.SET_CURRENT_PAGE, page));
  };

  const value = {
    vacancies,
    isLoading,
    favoritesIds,
    catalogues,
    pagesAmount,
    currentPage,
    isFavorite,
    addFavorite,
    deleteFavorite,
    updateParams,
    updateFilters,
    updateQuery,
    updateCurrentPage,
  };

  return (
    <VacanciesContext.Provider value={value}>{children}</VacanciesContext.Provider>
  );
};