import { Routes, Route } from "react-router-dom";
import Header from "./components/header/header.component";
import { Container, createStyles, rem } from "@mantine/core";

import ROUTES from "./constants/routes";

import Home from "./pages/home/home";

const useStyles = createStyles((theme) => ({
  mainContainer: {
    marginTop: rem(40),
    backgroundColor: 'inherit',
  }
}));

const App = () => {
  const { classes } = useStyles();

  return (
    <>
      <Header />
      <Container className={classes.mainContainer}>
        <Routes>
          <Route path={ROUTES.HOME} element={<Home />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
