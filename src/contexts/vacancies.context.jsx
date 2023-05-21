import { createContext, useEffect, useReducer } from "react";
import { fetchVacancies } from "../axios/requests";
import { createAction } from "../utils/reducer/reducer.utils";
import { useSearchParams } from "react-router-dom";

const VACANCIES_ACTION_TYPES = {
  SET_VACANCIES: 'SET_VACANCIES',
  SET_IS_LOADING: 'SET_IS_LOADING',
  SET_FAVORITES: 'SET_FAVORITES',
  SET_PARAMS: 'SET_PARAMS',
};

const INITIAL_STATE = {
  vacancies: [],
  isLoading: false,
  favoritesIds: [],
  params: '',
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
  const { vacancies, isLoading, favoritesIds, params } = state;

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

  const updateParams = (params) => {
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
    isFavorite,
    addFavorite,
    deleteFavorite,
    updateParams,
  };

  return (
    <VacanciesContext.Provider value={value}>{children}</VacanciesContext.Provider>
  );
};