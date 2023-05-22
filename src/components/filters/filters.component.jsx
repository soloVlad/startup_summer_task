import { useContext, useEffect, useState } from "react";
import { ActionIcon, Button, Flex, Group, Select, Stack, Text, rem } from "@mantine/core";
import { useForm } from "@mantine/form";
import Card from "../layout/card/card.component";
import { VacanciesContext } from "../../contexts/vacancies.context";

import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg';
import { ReactComponent as SelectArrowIcon } from '../../assets/icons/selectArrow.svg';
import InputWithArrows from "../layout/inputWithArrows/inputWithArrows.components";

import useStyles from "./filters.styles";

const findKeyByTitleTrimmed = (titleTrimmed, catalogues) => {
  if (!titleTrimmed) return '';
  const elem = catalogues.find(elem => elem['title_trimmed'] === titleTrimmed);
  return elem.key;
};

const Filters = ({ className }) => {
  const { classes } = useStyles();
  const { updateFilters, updateParams, catalogues } = useContext(VacanciesContext);
  const [isFiltersOpened, setIsFiltersOpened] = useState(false);
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);

  const form = useForm({
    initialValues: {
      catalogues: '',
      payment_from: '',
      payment_to: '',
    }
  });

  const changeDropdownState = () => {
    setIsDropdownOpened(!isDropdownOpened);
  };

  const changeFiltersState = () => {
    setIsFiltersOpened(!isFiltersOpened);
  }

  const onSubmit = (event) => {
    event.preventDefault();
    updateParams();
  };

  const handleReset = () => {
    form.reset();
  };

  useEffect(() => {
    const preparedFilters = {
      ...form.values,
      catalogues: findKeyByTitleTrimmed(form.values.catalogues, catalogues),
    };
    updateFilters(preparedFilters);
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
                label='Оклад'
                placeholder='От'
                classNames={{
                  label: classes.label,
                  input: classes.input,
                }}
                {...form.getInputProps('payment_from')}
              />
              <InputWithArrows
                placeholder='До'
                classNames={{
                  label: classes.label,
                  input: classes.input,
                }}
                {...form.getInputProps('payment_to')}
              />
            </Stack>

            <Button type='submit' className={classes.submitButton}>Применить</Button>
          </Stack>
        </form>
      </Card >
    </>
  );
};

export default Filters;