import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  card: {
    borderRadius: theme.other.cardRadius,
    padding: theme.other.cardPadding,
    maxWidth: theme.other.cardMaxWidth,
    border: `1px solid ${theme.other.cardBorderColor}`,
  }
}));

export default useStyles;