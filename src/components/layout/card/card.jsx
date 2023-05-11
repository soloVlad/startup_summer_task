import { Paper, createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  card: {
    border: theme.other.cardRadius,
    padding: theme.other.cardPadding,
  }
}));

const Card = ({ children, ...otherProps }) => {
  const { classes } = useStyles();

  return (
    <Paper className={classes.card} {...otherProps}>
      {children}
    </Paper>
  );
};

export default Card;