import { Flex, Loader, Stack, rem } from "@mantine/core";
import Filters from "../../components/filters/filters.component";
import VacanciesList from "../../components/vacanciesList/vacanciesList.component";

import useStyles from "./home.styles";
import { useContext, useState } from "react";
import { VacanciesContext } from "../../contexts/vacancies.context";
import SearchBar from "../../components/searchBar/searchBar.component";


const Home = () => {
  const { vacancies, isLoading, updateParams } = useContext(VacanciesContext);
  const [filters, setFilters] = useState({});
  const [query, setQuery] = useState('');
  const { classes } = useStyles();

  const handleSubmit = () => {
    const params = {
      ...filters,
      keyword: query,
    };
    updateParams(params);
  };

  return (
    <Flex gap={rem(28)} align='start' className={classes.wrapper}>
      <Filters
        setFilters={setFilters}
        handleSubmit={handleSubmit}
      />
      <Stack spacing='lg' w='100%'>
        <SearchBar setQuery={setQuery} handleSubmit={handleSubmit} />
        <VacanciesList
          vacancies={vacancies}
          isLoading={isLoading}
          setQuery={setQuery}
          handleSubmit={handleSubmit}
        />
      </Stack>
    </Flex >
  );
};

export default Home;