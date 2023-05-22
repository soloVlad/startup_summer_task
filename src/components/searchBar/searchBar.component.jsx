import { useContext, useState } from "react";
import { VacanciesContext } from "../../contexts/vacancies.context";
import { Button, TextInput, rem } from "@mantine/core";

import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg';

import { useStyles } from "./searchBar.styles";

const SearchBar = () => {
  const [value, setValue] = useState('');
  const { updateQuery, updateParams } = useContext(VacanciesContext);

  const { classes } = useStyles();

  const handleSearch = () => {
    updateParams();
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleBlur = (event) => {
    updateQuery(event.target.value);
  };

  return (
    <TextInput
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
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
  );
};

export default SearchBar;