import { ActionIcon, Button, Flex, Group, NumberInput, Select, Stack, Text, rem } from "@mantine/core";
import Card from "../layout/card/card.component";
import useStyles from "./filters.styles";

import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg';
import { ReactComponent as SelectArrowIcon } from '../../assets/icons/selectArrow.svg';
import InputWithArrows from "../layout/inputWithArrows/inputWithArrows.components";

const Filters = () => {
  const { classes } = useStyles();

  const handleControlsClick = (event) => {
  };

  return (
    <Card className={classes.filtersWrapper}>
      <Stack spacing='xl'>
        <Flex justify='space-between' className={classes.formTitleWrapper}>
          <Text className={classes.formTitle}>Фильтры</Text>
          <Group spacing={rem(4)} className={classes.closeButton} >
            <Text className={classes.closeButtonText}>Сбросить все</Text>
            <CloseIcon className={classes.closeButtonIcon} />
          </Group>
        </Flex>

        <Select
          onClick={handleControlsClick}
          label='Отрасль'
          data={['hell']}
          placeholder='Выберите отрасль'
          // rightSection={
          //   <ActionIcon variant='transparent' onClick={handleControlsClick}>
          //     <SelectArrowIcon className={classes.selectArrow} />
          //   </ActionIcon>
          // }
          rightSectionWidth={rem(48)}
          classNames={{
            rightSection: classes.selectArrow,
            label: classes.label,
            input: classes.input,
          }}
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
    </Card >
  );
};

export default Filters;