import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  card: {
    maxWidth: theme.other.cardMaxWidth,
    width: '100%',
    borderRadius: theme.other.cardRadius,
    padding: theme.other.cardPadding,
    border: `1px solid ${theme.other.cardBorderColor}`,
  }
}));

export default useStyles;