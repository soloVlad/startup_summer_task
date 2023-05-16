import { Button, Stack, Text, rem } from "@mantine/core";

import { ReactComponent as EmptyStateIcon } from '../../assets/icons/guyWithSearch.svg';

import useStyles from "./emptyState.styles";

const EmptyState = () => {
  const { classes } = useStyles();

  return (
    <Stack spacing={rem(32)} align='center' className={classes.wrapper}>
      <EmptyStateIcon />
      <Text className={classes.text}>Упс, здесь еще ничего нет!</Text>
      <Button variant='outline' className={classes.button}>Поиск Вакансий</Button>
    </Stack>
  );
};

export default EmptyState;