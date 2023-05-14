import { Button, Stack, TextInput, rem } from "@mantine/core";
import VacancyPreview from "../vacancyPreview/vacancyPreview.component";

import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg';

import useStyles from "./vacanciesList.styles";

const VacanciesList = ({ vacancies, withSearch }) => {
  const { classes } = useStyles();

  return (
    <Stack spacing='lg'>
      {
        withSearch &&
        <TextInput
          placeholder='Введите название вакансии'
          radius={rem(8)}
          icon={
            <SearchIcon />
          }
          iconWidth={rem(12.6)}
          rightSection={
            <Button className={classes.searchButton}>
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
        vacancies.map(vacancy => <VacancyPreview key={vacancy.id} vacancy={vacancy} />)
      }
    </Stack>
  );
};

export default VacanciesList;