import { Routes, Route } from "react-router-dom";
import Header from "./components/header/header.component";
import { Container, createStyles, rem } from "@mantine/core";

import Card from "./components/layout/card/card";

const Base = () => {
  return (
    <Card>
      Hello, world
    </Card>
  )
}

const useStyles = createStyles((theme) => ({
  mainContainer: {
    marginTop: rem(40),
  }
}));

const App = () => {
  const { classes } = useStyles();

  return (
    <>
      <Header />
      <Container className={classes.mainContainer}>
        <Routes>
          <Route path='/' element={<Base />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
