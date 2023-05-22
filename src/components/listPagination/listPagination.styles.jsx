import { createStyles, rem } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  pagination: {
    margin: `${rem(25)} auto ${rem(44)} auto`,
  },
  paginationControl: {
    borderRadius: rem(4),
    width: rem(32),
    height: rem(32),
    border: `1px solid ${theme.colors['grey-scale'][2]}`,

    '&[data-active]': {
      backgroundColor: theme.colors['bright-blue'][4],
      border: `1px solid ${theme.colors['bright-blue'][4]}`,
    }
  }
}));

export default useStyles;