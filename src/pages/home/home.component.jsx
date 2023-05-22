import { Flex, Stack, rem } from "@mantine/core";
import Filters from "../../components/filters/filters.component";
import VacanciesList from "../../components/vacanciesList/vacanciesList.component";

import { useContext } from "react";
import { VacanciesContext } from "../../contexts/vacancies.context";
import SearchBar from "../../components/searchBar/searchBar.component";

import useStyles from "./home.styles";

const Home = () => {
  const { vacancies, isLoading } = useContext(VacanciesContext);
  const { classes } = useStyles();

  return (
    <Flex gap={rem(28)} align='start' className={classes.wrapper}>
      <Filters />
      <Stack spacing='lg' w='100%'>
        <SearchBar />
        <VacanciesList
          vacancies={vacancies}
          isLoading={isLoading}
        />
      </Stack>
    </Flex >
  );
};

export default Home;