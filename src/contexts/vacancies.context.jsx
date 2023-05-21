import { createContext, useEffect, useReducer } from "react";
import { fetchVacancies } from "../axios/requests";
import { createAction } from "../utils/reducer/reducer.utils";

const VACANCIES_ACTION_TYPES = {
  SET_VACANCIES: 'SET_VACANCIES',
  SET_IS_LOADING: 'SET_IS_LOADING',
  SET_FAVORITES: 'SET_FAVORITES',
  SET_FILTERS: 'SET_FILTERS',
  SET_QUERY: 'SET_QUERY',
};

const INITIAL_STATE = {
  vacancies: [],
  isLoading: false,
  favoritesIds: [],
  filters: '',
  query: '',
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
    default:
      throw new Error(`Unhandled type ${type} in vacanciesReducer`);
  };
};

export const VacanciesContext = createContext({
  ...INITIAL_STATE,
  isFavorite: () => { },
  addFavorite: () => { },
  deleteFavorite: () => { },
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
  const [state, dispatch] = useReducer(vacanciesReducer, INITIAL_STATE);
  const { vacancies, isLoading, favoritesIds, filters, query } = state;

  useEffect(() => {
    const loadVacancies = async () => {
      dispatch(createAction(VACANCIES_ACTION_TYPES.SET_IS_LOADING, true));
      const params = {
        ...filters,
        keyword: query,
      };
      const { objects: vacancies } = await fetchVacancies(params);
      const payload = { vacancies };

      dispatch(createAction(VACANCIES_ACTION_TYPES.SET_VACANCIES, payload));
      dispatch(createAction(VACANCIES_ACTION_TYPES.SET_IS_LOADING, false));
    };

    loadVacancies();
  }, [filters, query]);

  useEffect(() => {
    const savedFavorites = getFavoritesFromLocalStorage();
    const payload = { favoritesIds: savedFavorites };
    dispatch(createAction(VACANCIES_ACTION_TYPES.SET_FAVORITES, payload));
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

  const updateFilters = (filters) => {
    dispatch(createAction(VACANCIES_ACTION_TYPES.SET_FILTERS, filters));
  };

  const updateQuery = (query) => {
    dispatch(createAction(VACANCIES_ACTION_TYPES.SET_QUERY, query));
  }

  const value = {
    vacancies,
    isLoading,
    favoritesIds,
    filters,
    isFavorite,
    addFavorite,
    deleteFavorite,
    updateFilters,
    updateQuery,
  };

  return (
    <VacanciesContext.Provider value={value}>{children}</VacanciesContext.Provider>
  );
};