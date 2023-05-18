import { createStyles, rem } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  rightSection: {
    gap: 0,
  },
  control: {
    padding: 0,
    margin: 0,
    border: 'none',
    cursor: 'pointer',

    '& svg': {
      color: theme.colors['grey-scale'][3],
      stroke: theme.colors['grey-scale'][3],
      strokeWidth: rem(0.4),
    },

    '&:hover': {
      'svg': {
        color: theme.colors['bright-blue'][4],
      }
    }
  },
  controlUp: {
    alignItems: 'flex-end',
  },
  controlDown: {
    alignItems: 'flex-start',
  },
}));

export default useStyles;