import { createStyles, rem } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  wrapper: {
    maxWidth: theme.other.cardMaxWidth,
  },
  searchInput: {
    height: rem(48),
    padding: `${rem(8)} ${rem(12)}`,
    border: `1px solid ${theme.other.cardBorderColor}`,
  },
  searchIcon: {
    left: rem(14),
  },
  searchButton: {
    padding: `${rem(5.5)} ${rem(20)}`
  }
}));

export default useStyles