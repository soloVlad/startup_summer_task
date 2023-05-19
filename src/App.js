import { useEffect } from "react";

import { Routes, Route } from "react-router-dom";
import Header from "./components/header/header.component";
import { Container, createStyles, rem } from "@mantine/core";

import ROUTES from "./constants/routes";

import Home from "./pages/home/home.component";
import Favorites from "./pages/favorites/favorites.component";
import Vacancy from "./pages/vacancy/vacancy.component";
import { getAuth } from "./axios/requests";

const useStyles = createStyles((theme) => ({
  mainContainer: {
    marginTop: rem(40),
    backgroundColor: 'inherit',

    [theme.fn.smallerThan('sm')]: {
      marginTop: rem(20),
    }
  }
}));

const login = async () => {
  // TODO: check ttl of token, use refresh token
  if (localStorage.getItem('token')) return;

  const response = await getAuth();
  localStorage.setItem('token', JSON.stringify(response));
};

const App = () => {
  const { classes } = useStyles();

  useEffect(() => {
    login();
  }, []);

  return (
    <>
      <Header />
      <Container className={classes.mainContainer}>
        <Routes>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.FAVORITES} element={<Favorites />} />
          <Route path={`${ROUTES.VACANCY}/:id`} element={<Vacancy />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
