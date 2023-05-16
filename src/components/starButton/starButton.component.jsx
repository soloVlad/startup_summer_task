import { useState } from "react";
import { ActionIcon, Center, rem } from "@mantine/core";

import { ReactComponent as StarIcon } from '../../assets/icons/star.svg';

import useStyles from "./starButton.styles";

const StarButton = () => {
  const [isActive, setIsActive] = useState(false);
  const { classes } = useStyles();

  const handleStarClick = (event) => {
    event.stopPropagation();
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