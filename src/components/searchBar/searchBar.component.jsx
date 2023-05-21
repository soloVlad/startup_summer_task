import { useState } from "react";
import { Button, TextInput, rem } from "@mantine/core";

import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg';

import { useStyles } from "./searchBar.styles";

const SearchBar = ({ setQuery, handleSubmit }) => {
  const [value, setValue] = useState('');

  const { classes } = useStyles();

  const handleSearch = () => {
    handleSubmit();
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleBlur = (event) => {
    setQuery(event.target.value);
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