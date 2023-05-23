import { useContext, useEffect, useState } from "react";
import { ActionIcon, Button, Flex, Group, Select, Stack, Text, rem } from "@mantine/core";
import { useForm } from "@mantine/form";
import Card from "../layout/card/card.component";
import { VacanciesContext } from "../../contexts/vacancies.context";

import { INITIAL_PARAMS } from "../../pages/home/home.component";

import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg';
import { ReactComponent as SelectArrowIcon } from '../../assets/icons/selectArrow.svg';
import InputWithArrows from "../layout/inputWithArrows/inputWithArrows.components";

import useStyles from "./filters.styles";

const findKeyByTitleTrimmed = (titleTrimmed, catalogues) => {
  if (!titleTrimmed) return '';
  const elem = catalogues.find(elem => elem['title_trimmed'] === titleTrimmed);
  return elem.key;
};

const prepareParams = (formValues, catalogues) => {
  return {
    ...formValues,
    catalogues: findKeyByTitleTrimmed(formValues.catalogues, catalogues),
  };
};

const Filters = ({ params, setParams, handleRequest, className }) => {
  const { classes } = useStyles();
  const { catalogues } = useContext(VacanciesContext);
  const [isFiltersOpened, setIsFiltersOpened] = useState(false);
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);

  const form = useForm({
    initialValues: INITIAL_PARAMS.filters,
  });

  const changeDropdownState = () => {
    setIsDropdownOpened(!isDropdownOpened);
  };

  const changeFiltersState = () => {
    setIsFiltersOpened(!isFiltersOpened);
  }

  const onSubmit = (event) => {
    event.preventDefault();
    handleRequest({ ...params, currentPage: INITIAL_PARAMS.currentPage });
  };

  const handleReset = () => {
    form.reset();
    handleRequest({ ...params, filters: { ...INITIAL_PARAMS.filters }, currentPage: INITIAL_PARAMS.currentPage });
  };

  useEffect(() => {
    const preparedFilters = prepareParams(form.values, catalogues);
    setParams({ ...params, filters: preparedFilters });
  }, [form.values]);

  return (
    <>
      <Button
        className={classes.toggleFilters}
        onClick={changeFiltersState}
      >
        Фильтры
      </Button>

      <Card
        className={`${classes.filtersWrapper} ${isFiltersOpened && classes.filtersOpened} ${className}`}
      >
        <form onSubmit={onSubmit}>
          <Stack spacing='xl'>
            <Flex justify='space-between' className={classes.formTitleWrapper}>
              <Text className={classes.formTitle}>Фильтры</Text>
              <Group spacing={rem(4)} className={classes.closeButton} onClick={handleReset} >
                <Text className={classes.closeButtonText}>Сбросить все</Text>
                <CloseIcon className={classes.closeButtonIcon} />
              </Group>
            </Flex>

            <Select
              data-elem='industry-select'
              label='Отрасль'
              allowDeselect
              data={catalogues.map(item => item.title_trimmed)}
              placeholder='Выберите отрасль'
              rightSection={
                <ActionIcon variant='transparent'>
                  <SelectArrowIcon
                    className={`${classes.selectArrow} ${isDropdownOpened && classes.selectArrowActive}`}
                  />
                </ActionIcon>
              }
              onDropdownOpen={changeDropdownState}
              onDropdownClose={changeDropdownState}
              rightSectionWidth={rem(48)}
              {...form.getInputProps('catalogues')}
              classNames={{
                rightSection: `${classes.selectRight} `,
                label: classes.label,
                input: classes.input,
                item: classes.dropdownItem,
                itemsWrapper: classes.dropdownWrapper,
              }}
              className={classes.select}
            />

            <Stack spacing='sm'>
              <InputWithArrows
                data-elem='salary-from-input'
                label='Оклад'
                placeholder='От'
                classNames={{
                  label: classes.label,
                  input: classes.input,
                }}
                {...form.getInputProps('payment_from')}
              />
              <InputWithArrows
                data-elem='salary-to-input'
                placeholder='До'
                classNames={{
                  label: classes.label,
                  input: classes.input,
                }}
                {...form.getInputProps('payment_to')}
              />
            </Stack>

            <Button data-elem='search-button' type='submit' className={classes.submitButton}>Применить</Button>
          </Stack>
        </form>
      </Card >
    </>
  );
};

export default Filters;