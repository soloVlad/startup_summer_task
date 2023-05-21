import { createStyles, rem } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  wrapper: {
    maxWidth: theme.other.cardMaxWidth,
    width: '100%',
    flexGrow: 1,
  },
  searchInput: {
    width: '100%',
    height: rem(48),
    border: `1px solid ${theme.other.cardBorderColor}`,
    lineHeight: rem(21),
    caretColor: theme.colors['bright-blue'][4],

    '&:focus': {
      border: `1px solid ${theme.colors['bright-blue'][4]}`,
    },
  },
  searchIcon: {
    left: rem(14),
  },
  searchButton: {
    padding: `${rem(5.5)} ${rem(20)}`
  },
}));