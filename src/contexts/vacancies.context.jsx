import { createContext, useEffect, useReducer } from "react";
import { getVacancies } from "../axios/requests";
import { createAction } from "../utils/reducer/reducer.utils";

const VACANCIES_ACTION_TYPES = {
  SET_VACANCIES: 'SET_VACANCIES',
  SET_IS_LOADING: 'SET_IS_LOADING',
  SET_FAVORITES: 'SET_FAVORITES'
};

const INITIAL_STATE = {
  vacancies: [],
  isLoading: false,
  favorites: [],
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

const getFavoritesFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('favorites')) || [];
};

const saveFavoritesToLocalStorage = (favorites) => {
  localStorage.setItem('favorites', JSON.stringify(favorites));
};

export const VacanciesProvider = ({ children }) => {
  const [{ vacancies, isLoading, favorites }, dispatch] = useReducer(vacanciesReducer, INITIAL_STATE);

  useEffect(() => {
    const loadVacancies = async () => {
      dispatch(createAction(VACANCIES_ACTION_TYPES.SET_IS_LOADING, true));
      const { objects: vacancies } = await getVacancies();
      const payload = { vacancies };

      dispatch(createAction(VACANCIES_ACTION_TYPES.SET_VACANCIES, payload));
      dispatch(createAction(VACANCIES_ACTION_TYPES.SET_IS_LOADING, false));
    };

    loadVacancies();
  }, []);

  useEffect(() => {
    const savedFavorites = getFavoritesFromLocalStorage();
    const payload = { favorites: savedFavorites };
    dispatch(createAction(VACANCIES_ACTION_TYPES.SET_FAVORITES, payload));
  }, []);

  const updateFavorites = (favorites) => {
    const payload = { favorites };
    dispatch(createAction(VACANCIES_ACTION_TYPES.SET_FAVORITES, payload));
  }

  const addFavorite = (id) => {
    const newFavorites = [...favorites, id];
    saveFavoritesToLocalStorage(newFavorites);
    updateFavorites(newFavorites);
  };

  const deleteFavorite = (id) => {
    const newFavorites = favorites.filter(favoriteId => favoriteId !== id);
    saveFavoritesToLocalStorage(newFavorites);
    updateFavorites(newFavorites);
  };

  const isFavorite = (id) => {
    return favorites.includes(id);
  }

  const value = {
    vacancies,
    isLoading,
    favorites,
    isFavorite,
    addFavorite,
    deleteFavorite,
  };

  return (
    <VacanciesContext.Provider value={value}>{children}</VacanciesContext.Provider>
  );
};