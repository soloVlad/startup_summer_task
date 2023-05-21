import { Button, Loader, Stack, TextInput, rem } from "@mantine/core";
import VacancyPreview from "../vacancyPreview/vacancyPreview.component";

import { useContext, useRef, useState } from "react";
import { VacanciesContext } from "../../contexts/vacancies.context";

import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg';

import useStyles from "./vacanciesList.styles";

const VacanciesList = ({ vacancies, withSearch, isLoading }) => {
  const inputRef = useRef(null);
  const { updateQuery } = useContext(VacanciesContext);
  const { classes } = useStyles();

  const handleSearch = () => {
    updateQuery(inputRef.current.value);
  };

  return (
    <Stack spacing='lg' className={classes.listWrapper}>
      {
        withSearch &&
        <TextInput
          ref={inputRef}
          placeholder='Введите название вакансии'
          radius={rem(8)}
          icon={
            <SearchIcon />
          }
          iconWidth={rem(12.6)}
          rightSection={
            <Button className={classes.searchButton} onClick={handleSearch}>
              Поиск
            </Button>
          }
          rightSectionWidth={rem(107)}
          classNames={{
            input: classes.searchInput,
            icon: classes.searchIcon,
          }}
          className={classes.wrapper}
          aria-label='search vacancy'
        />
      }
      {
        isLoading
          ? <Loader className={classes.loader} />
          : vacancies.map(vacancy => <VacancyPreview key={vacancy.id} vacancy={vacancy} />)
      }
    </Stack>
  );
};

export default VacanciesList;