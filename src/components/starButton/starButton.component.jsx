import { useContext, useEffect, useState } from "react";
import { ActionIcon, rem } from "@mantine/core";

import { ReactComponent as StarIcon } from '../../assets/icons/star.svg';

import useStyles from "./starButton.styles";
import { VacanciesContext } from "../../contexts/vacancies.context";

const StarButton = ({ vacancyId }) => {
  const [isActive, setIsActive] = useState(false);
  const { isFavorite, addFavorite, deleteFavorite } = useContext(VacanciesContext);
  const { classes } = useStyles();

  useEffect(() => {
    if (isFavorite(vacancyId)) {
      setIsActive(true);
    }
  }, []);

  const handleStarClick = (event) => {
    event.stopPropagation();
    if (isActive) {
      deleteFavorite(vacancyId);
    } else {
      addFavorite(vacancyId);
    }
    setIsActive(!isActive);
  };

  return (
    <ActionIcon
      variant='transparent'
      className={classes.wrapper}
      onClick={handleStarClick}
      size={rem(24)}
    >
      <StarIcon
        className={`${isActive ? classes.starActive : classes.star}`}
      />
    </ActionIcon>
  );
};

export default StarButton;