import { Button, Stack, Text, rem } from "@mantine/core";

import { ReactComponent as EmptyStateIcon } from '../../assets/icons/guyWithSearch.svg';

import useStyles from "./emptyState.styles";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../constants/routes";

const EmptyState = () => {
  const navigate = useNavigate();

  const { classes } = useStyles();

  const handleClick = () => {
    navigate(ROUTES.HOME);
  };

  return (
    <Stack spacing={rem(32)} align='center' className={classes.wrapper}>
      <EmptyStateIcon />
      <Text className={classes.text}>Упс, здесь еще ничего нет!</Text>
      <Button
        variant='outline'
        className={classes.button}
        onClick={handleClick}
      >
        Поиск Вакансий
      </Button>
    </Stack>
  );
};

export default EmptyState;