import { Paper } from "@mantine/core";

import useStyles from "./card.styles";

const Card = ({ children, className, ...otherProps }) => {
  const { classes } = useStyles();

  return (
    <Paper className={`${classes.card} ${className}`}  {...otherProps}>
      {children}
    </Paper>
  );
};

export default Card;