import { createContext, useEffect, useReducer } from "react";
import { fetchCatalogues, fetchVacancies } from "../axios/requests";
import { createAction } from "../utils/reducer/reducer.utils";
import { useSearchParams } from "react-router-dom";
import { PAGES_AMOUNT, VACANCIES_PER_PAGE } from "../constants/api";

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

const getFavoritesFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('favorites')) || [];
};

const saveFavoritesToLocalStorage = (favoritesIds) => {
  localStorage.setItem('favorites', JSON.stringify(favoritesIds));
};

const convertSearchParamsToObject = (searchParams) => {
  const paramsObj = {};
  searchParams.forEach((value, key) => {
    paramsObj[key] = value;
  })
  return paramsObj
};

export const VacanciesProvider = ({ children }) => {
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
    setSearchParams({ ...convertSearchParamsToObject(searchParams), currentPage: currentPage + 1 });

    dispatch(createAction(VACANCIES_ACTION_TYPES.SET_IS_LOADING, true));
    
    const { objects: vacancies, total } = await fetchVacancies({ ...params, page: currentPage });
    const payload = { vacancies };
    let amountOfPages = total / VACANCIES_PER_PAGE;
    amountOfPages = amountOfPages > PAGES_AMOUNT ? PAGES_AMOUNT : amountOfPages;

    console.log(pagesAmount);

    dispatch(createAction(VACANCIES_ACTION_TYPES.SET_VACANCIES, payload));
    dispatch(createAction(VACANCIES_ACTION_TYPES.SET_PAGES_AMOUNT, amountOfPages));
    dispatch(createAction(VACANCIES_ACTION_TYPES.SET_IS_LOADING, false));
  };

  useEffect(() => {
    loadVacancies();
  }, [params, currentPage]);

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