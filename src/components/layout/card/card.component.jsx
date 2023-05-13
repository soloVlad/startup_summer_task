import { Paper } from "@mantine/core";

import useStyles from "./card.styles";

const Card = ({ children, ...otherProps }) => {
  const { classes } = useStyles();

  return (
    <Paper className={classes.card}  {...otherProps}>
      {children}
    </Paper>
  );
};

export default Card;