import { useState } from "react";
import { Button, Center } from "@mantine/core";

import { ReactComponent as StarIcon } from '../../assets/icons/star.svg';

import useStyles from "./starButton.styles";

const StarButton = () => {
  const [isActive, setIsActive] = useState(false);
  const { classes } = useStyles();

  const handleStarClick = () => {
    setIsActive(!isActive);
  };

  return (
    <Center className={classes.wrapper} onClick={handleStarClick}>
      <StarIcon
        className={`${classes.star} ${isActive ? classes.starActive : ''}`}
      />
    </Center>
  );
};

export default StarButton;