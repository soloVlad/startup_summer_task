import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  card: {
    borderRadius: theme.other.cardRadius,
    padding: theme.other.cardPadding,
    border: `1px solid ${theme.other.cardBorderColor}`,
  }
}));

export default useStyles;