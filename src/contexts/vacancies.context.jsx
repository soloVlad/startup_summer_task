import { createContext, useEffect, useReducer } from "react";
import { fetchCatalogues, fetchVacancies } from "../axios/requests";
import { createAction } from "../utils/reducer/reducer.utils";
import { useSearchParams } from "react-router-dom";

const VACANCIES_ACTION_TYPES = {
  SET_VACANCIES: 'SET_VACANCIES',
  SET_IS_LOADING: 'SET_IS_LOADING',
  SET_FAVORITES: 'SET_FAVORITES',
  SET_PARAMS: 'SET_PARAMS',
  SET_FILTERS: 'SET_FILTERS',
  SET_QUERY: 'SET_QUERY',
  SET_CATALOGUES: 'SET_CATALOGUES',
};

const INITIAL_STATE = {
  vacancies: [],
  isLoading: false,
  favoritesIds: [],
  params: '',
  filters: '',
  query: '',
  catalogues: [],
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
      }
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
});

const getFavoritesFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('favorites')) || [];
};

const saveFavoritesToLocalStorage = (favoritesIds) => {
  localStorage.setItem('favorites', JSON.stringify(favoritesIds));
};

export const VacanciesProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [state, dispatch] = useReducer(vacanciesReducer, INITIAL_STATE);
  const { vacancies, isLoading, favoritesIds, params, filters, query, catalogues } = state;

  const loadVacancies = async () => {
    dispatch(createAction(VACANCIES_ACTION_TYPES.SET_IS_LOADING, true));

    const { objects: vacancies } = await fetchVacancies(params);
    const payload = { vacancies };

    dispatch(createAction(VACANCIES_ACTION_TYPES.SET_VACANCIES, payload));
    dispatch(createAction(VACANCIES_ACTION_TYPES.SET_IS_LOADING, false));
  };

  useEffect(() => {
    loadVacancies();
  }, [params]);

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

  const updateParams = () => {
    const params = {
      ...filters,
      keyword: query,
    };
    const preparedParams = {};
    for (let param in params) {
      if (params[param]) preparedParams[param] = params[param];
    }
    setSearchParams(preparedParams);
    dispatch(createAction(VACANCIES_ACTION_TYPES.SET_PARAMS, preparedParams));
  };

  const value = {
    vacancies,
    isLoading,
    favoritesIds,
    catalogues,
    isFavorite,
    addFavorite,
    deleteFavorite,
    updateParams,
    updateFilters,
    updateQuery,
  };

  return (
    <VacanciesContext.Provider value={value}>{children}</VacanciesContext.Provider>
  );
};