import { Routes, Route } from "react-router-dom";
import Header from "./components/header/header.component";
import { Container, createStyles } from "@mantine/core";

const Base = () => {
  return (
    <div>
      Hello, world
    </div>
  )
}

const useStyles = createStyles((theme) => ({
  mainContainer: {
  }
}));

const App = () => {
  const { classes } = useStyles();

  return (
    <>
      <Header />
      <Container>
        <Routes>
          <Route path='/' element={<Base />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
