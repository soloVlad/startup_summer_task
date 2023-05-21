import { Button, Loader, Stack, TextInput, rem } from "@mantine/core";
import VacancyPreview from "../vacancyPreview/vacancyPreview.component";

import { useEffect, useState } from "react";

import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg';

import useStyles from "./vacanciesList.styles";

const VacanciesList = ({ vacancies, withSearch, isLoading, setQuery = null, handleSubmit = null }) => {
  const [value, setValue] = useState('');
  const { classes } = useStyles();

  const handleSearch = () => {
    handleSubmit();
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    setQuery(value);
  }, [value]);

  // useEffect(() => {
  //   //TODO: load parameter from URL
  //   if (withSearch) {
  //     updateQuery(inputRef.current.value);
  //   }
  // }, []);

  return (
    <Stack spacing='lg' className={classes.listWrapper}>
      {
        withSearch &&
        <TextInput
          value={value}
          onChange={handleChange}
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