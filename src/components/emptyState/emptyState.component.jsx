import { Button, Stack, Text, rem } from "@mantine/core";
import { useNavigate } from "react-router-dom";

import { ReactComponent as EmptyStateIcon } from '../../assets/icons/guyWithSearch.svg';

import ROUTES from "../../constants/routes";

import useStyles from "./emptyState.styles";

const EmptyState = (props) => {
  const navigate = useNavigate();

  const { classes } = useStyles();

  const handleClick = () => {
    navigate(ROUTES.HOME);
  };

  return (
    <Stack spacing={rem(32)} align='center' className={classes.wrapper} {...props}>
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