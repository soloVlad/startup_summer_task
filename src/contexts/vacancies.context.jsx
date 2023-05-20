import { createContext, useEffect, useReducer } from "react";
import { fetchFavorites, fetchVacancies } from "../axios/requests";
import { createAction } from "../utils/reducer/reducer.utils";

const VACANCIES_ACTION_TYPES = {
  SET_VACANCIES: 'SET_VACANCIES',
  SET_IS_LOADING: 'SET_IS_LOADING',
  SET_FAVORITES: 'SET_FAVORITES'
};

const INITIAL_STATE = {
  vacancies: [],
  isLoading: false,
  favoritesIds: [],
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

const saveFavoritesToLocalStorage = (favoritesIds) => {
  localStorage.setItem('favorites', JSON.stringify(favoritesIds));
};

export const VacanciesProvider = ({ children }) => {
  const [{ vacancies, isLoading, favoritesIds }, dispatch] = useReducer(vacanciesReducer, INITIAL_STATE);

  useEffect(() => {
    const loadVacancies = async () => {
      dispatch(createAction(VACANCIES_ACTION_TYPES.SET_IS_LOADING, true));
      const { objects: vacancies } = await fetchVacancies();
      const payload = { vacancies };

      dispatch(createAction(VACANCIES_ACTION_TYPES.SET_VACANCIES, payload));
      dispatch(createAction(VACANCIES_ACTION_TYPES.SET_IS_LOADING, false));
    };

    loadVacancies();
  }, []);

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

  const value = {
    vacancies,
    isLoading,
    favoritesIds,
    isFavorite,
    addFavorite,
    deleteFavorite,
  };

  return (
    <VacanciesContext.Provider value={value}>{children}</VacanciesContext.Provider>
  );
};