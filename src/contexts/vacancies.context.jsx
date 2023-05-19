import { createContext, useEffect, useReducer } from "react";
import { getVacancies } from "../axios/requests";
import { createAction } from "../utils/reducer/reducer.utils";

const VACANCIES_ACTION_TYPES = {
  SET_VACANCIES: 'SET_VACANCIES',
  SET_IS_LOADING: 'SET_IS_LOADING',
};

const INITIAL_STATE = {
  vacancies: [],
  isLoading: false,
};

const vacanciesReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case VACANCIES_ACTION_TYPES.SET_VACANCIES:
      return {
        ...state,
        ...payload
      }
    case VACANCIES_ACTION_TYPES.SET_IS_LOADING:
      return {
        ...state,
        isLoading: payload,
      }
    default:
      throw new Error(`Unhandled type ${type} in vacanciesReducer`);
  };
};

export const VacanciesContext = createContext({
  ...INITIAL_STATE,
});

export const VacanciesProvider = ({ children }) => {
  const [{ vacancies, isLoading }, dispatch] = useReducer(vacanciesReducer, INITIAL_STATE);

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

  const value = {
    vacancies,
    isLoading
  };

  return (
    <VacanciesContext.Provider value={value}>{children}</VacanciesContext.Provider>
  );
};