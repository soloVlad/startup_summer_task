import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { Flex, Stack, rem } from "@mantine/core";
import Filters from "../../components/filters/filters.component";
import VacanciesList from "../../components/vacanciesList/vacanciesList.component";

import { VacanciesContext } from "../../contexts/vacancies.context";
import SearchBar from "../../components/searchBar/searchBar.component";
import ListPagination from "../../components/listPagination/listPagination.component";

import useStyles from "./home.styles";
import { convertSearchParamsToObject, removeFalsyParams } from "../../utils/utils";

export const INITIAL_PARAMS = {
  currentPage: 1,
  keyword: '',
  filters: {
    payment_from: '',
    payment_to: '',
    catalogues: '',
  },
};

const Home = () => {
  const { vacancies, isLoading } = useContext(VacanciesContext);
  const [params, setParams] = useState(INITIAL_PARAMS);
  const [searchParams, setSearchParams] = useSearchParams();

  const { classes } = useStyles();

  const handleRequest = (paramsToSend) => {
    if (paramsToSend) setParams(paramsToSend);

    const computedParams = paramsToSend ? paramsToSend : params;
    const { filters, ...preparedParams } = computedParams;
    Object.assign(preparedParams, filters);
    const filteredParams = removeFalsyParams(preparedParams);
    setSearchParams(filteredParams);
  };

  useEffect(() => {
    setSearchParams({ currentPage: INITIAL_PARAMS.currentPage });
  }, []);

  return (
    <Flex gap={rem(28)} align='start' className={classes.wrapper}>
      <Filters
        params={params}
        setParams={setParams}
        handleRequest={handleRequest}
      />
      <Stack spacing='lg' w='100%'>
        <SearchBar
          params={params}
          setParams={setParams}
          handleRequest={handleRequest}
        />
        <VacanciesList
          vacancies={vacancies}
          isLoading={isLoading}
        />
        <ListPagination
          params={params}
          setParams={setParams}
          handleRequest={handleRequest}
        />
      </Stack>
    </Flex >
  );
};

export default Home;