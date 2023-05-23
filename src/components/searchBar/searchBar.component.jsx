import { useEffect, useState } from "react";
import { Button, TextInput, rem } from "@mantine/core";
import { INITIAL_PARAMS } from "../../pages/home/home.component";

import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg';

import { useStyles } from "./searchBar.styles";

const SearchBar = ({ params, setParams, handleRequest }) => {
  const [keyword, setKeyword] = useState(params.keyword);
  const { classes } = useStyles();

  const handleBlur = () => {
    setParams({ ...params, keyword: keyword });
  };

  const handleChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleClick = () => {
    handleRequest({ ...params, currentPage: INITIAL_PARAMS.currentPage });
  }

  useEffect(() => {
    setKeyword(params.keyword);
  }, [params]);

  return (
    <TextInput
      data-elem='search-input'
      value={keyword}
      onChange={handleChange}
      onBlur={handleBlur}
      placeholder='Введите название вакансии'
      radius={rem(8)}
      icon={
        <SearchIcon />
      }
      iconWidth={rem(12.6)}
      rightSection={
        <Button data-elem='search-button' className={classes.searchButton} onClick={handleClick}>
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