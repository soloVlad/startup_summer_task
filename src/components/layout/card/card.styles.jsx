import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  card: {
    borderRadius: theme.other.cardRadius,
    padding: theme.other.cardPadding,
    maxWidth: theme.other.cardMaxWidth,
  }
}));

export default useStyles;