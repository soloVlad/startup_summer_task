import { createStyles, rem } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  listWrapper: {
    maxWidth: theme.other.cardMaxWidth,
    width: '100%',
  },
  wrapper: {
    maxWidth: theme.other.cardMaxWidth,
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
  }
}));

export default useStyles