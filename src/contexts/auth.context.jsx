import { createContext, useEffect, useReducer } from "react";
import { getAuth } from "../axios/requests";
import { createAction } from "../utils/reducer/reducer.utils";

const AUTH_ACTION_TYPES = {
  SET_TOKEN: 'SET_TOKEN',
};

const INITIAL_STATE = {
  token: '',
};

const authReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case AUTH_ACTION_TYPES.SET_TOKEN:
      return {
        ...state,
        token: payload,
      };
    default:
      throw new Error(`Unhandled type ${type} in authReducer`);
  };
};

export const AuthContext = createContext({
  ...INITIAL_STATE,
});

export const AuthProvider = ({ children }) => {
  const [{ token }, dispatch] = useReducer(authReducer, INITIAL_STATE);

  useEffect(() => {
    const login = async () => {
      // TODO: check ttl of token, use refresh token
      if (localStorage.getItem('token')) {
        dispatch(createAction(AUTH_ACTION_TYPES.SET_TOKEN, JSON.parse(localStorage.getItem('token'))));
      } else {
        const response = await getAuth();
        dispatch(createAction(AUTH_ACTION_TYPES.SET_TOKEN, response));
        localStorage.setItem('token', JSON.stringify(response));
      }
    };

    login();
  }, []);

  const value = {
    token,
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  )
}