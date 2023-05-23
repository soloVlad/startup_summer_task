import { createContext, useContext, useEffect, useReducer } from "react";
import { useSearchParams } from "react-router-dom";

import { fetchCatalogues, fetchVacancies } from "../axios/requests";

import { createAction } from "../utils/reducer/reducer.utils";
import {
  calcAmountOfPages,
  convertSearchParamsToObject,
  getFavoritesFromLocalStorage,
  removeFalsyParams,
  saveFavoritesToLocalStorage
} from "../utils/utils";
import { AuthContext } from "./auth.context";

const VACANCIES_ACTION_TYPES = {
  SET_VACANCIES: 'SET_VACANCIES',
  SET_IS_LOADING: 'SET_IS_LOADING',
  SET_FAVORITES: 'SET_FAVORITES',
  SET_CATALOGUES: 'SET_CATALOGUES',
  SET_PAGES_AMOUNT: 'SET_PAGES_AMOUNT',
};

const INITIAL_STATE = {
  vacancies: [],
  isLoading: false,
  favoritesIds: [],
  catalogues: [],
  pagesAmount: 0,
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
    default:
      throw new Error(`Unhandled type ${type} in vacanciesReducer`);
  };
};

export const VacanciesContext = createContext({
  ...INITIAL_STATE,
  isFavorite: () => { },
  addFavorite: () => { },
  deleteFavorite: () => { },
});

export const VacanciesProvider = ({ children }) => {
  const { token } = useContext(AuthContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [state, dispatch] = useReducer(vacanciesReducer, INITIAL_STATE);
  const {
    vacancies,
    isLoading,
    favoritesIds,
    catalogues,
    pagesAmount,
  } = state;


  const loadVacancies = async () => {
    if (!token) return;

    dispatch(createAction(VACANCIES_ACTION_TYPES.SET_IS_LOADING, true));
    const searchParamsObj = convertSearchParamsToObject(searchParams);
    const currentPage = +searchParams.get('currentPage') - 1;
    const preparedParams = { ...searchParamsObj, page: currentPage };
    const filteredParams = removeFalsyParams(preparedParams);
    if (filteredParams.payment_from || filteredParams.payment_to) {
      filteredParams['no_agreement'] = 1;
    }

    const { objects: vacancies, total } = await fetchVacancies(filteredParams);
    const payload = { vacancies };
    const amountOfPages = calcAmountOfPages(total);

    dispatch(createAction(VACANCIES_ACTION_TYPES.SET_VACANCIES, payload));
    dispatch(createAction(VACANCIES_ACTION_TYPES.SET_PAGES_AMOUNT, amountOfPages));
    dispatch(createAction(VACANCIES_ACTION_TYPES.SET_IS_LOADING, false));
  };

  useEffect(() => {
    loadVacancies();
  }, [searchParams, token]);

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

  const value = {
    vacancies,
    isLoading,
    favoritesIds,
    catalogues,
    pagesAmount,
    isFavorite,
    addFavorite,
    deleteFavorite,
  };

  return (
    <VacanciesContext.Provider value={value}>{children}</VacanciesContext.Provider>
  );
};