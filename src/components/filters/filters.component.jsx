import { useState } from "react";
import { ActionIcon, Button, Flex, Group, Select, Stack, Text, rem } from "@mantine/core";
import Card from "../layout/card/card.component";
import useStyles from "./filters.styles";

import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg';
import { ReactComponent as SelectArrowIcon } from '../../assets/icons/selectArrow.svg';
import InputWithArrows from "../layout/inputWithArrows/inputWithArrows.components";

const Filters = ({ className }) => {
  const { classes } = useStyles();
  const [isFiltersOpened, setIsFiltersOpened] = useState(false);
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);

  const changeDropdownState = () => {
    setIsDropdownOpened(!isDropdownOpened);
  };

  const changeFiltersState = () => {
    setIsFiltersOpened(!isFiltersOpened);
  }

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
        <Stack spacing='xl'>
          <Flex justify='space-between' className={classes.formTitleWrapper}>
            <Text className={classes.formTitle}>Фильтры</Text>
            <Group spacing={rem(4)} className={classes.closeButton} >
              <Text className={classes.closeButtonText}>Сбросить все</Text>
              <CloseIcon className={classes.closeButtonIcon} />
            </Group>
          </Flex>

          <Select
            label='Отрасль'
            allowDeselect
            data={['hell', 'hell2']}
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
            />
            <InputWithArrows
              placeholder='До'
              classNames={{
                label: classes.label,
                input: classes.input,
              }}
            />
          </Stack>

          <Button className={classes.submitButton}>Применить</Button>
        </Stack>
      </Card ></>
  );
};

export default Filters;