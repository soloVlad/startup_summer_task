import { Flex, Loader, rem } from "@mantine/core";
import Filters from "../../components/filters/filters.component";
import VacanciesList from "../../components/vacanciesList/vacanciesList.component";

import useStyles from "./home.styles";
import { useContext } from "react";
import { VacanciesContext } from "../../contexts/vacancies.context";

const Home = () => {
  const { classes } = useStyles();
  const { vacancies, isLoading } = useContext(VacanciesContext);

  return (
    <Flex gap={rem(28)} align='start' className={classes.wrapper}>
      <Filters />
      <VacanciesList vacancies={vacancies} withSearch={true} isLoading={isLoading} />
    </Flex >
  );
};

export default Home;