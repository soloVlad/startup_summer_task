import { createStyles, rem } from "@mantine/core";


const useStyles = createStyles((theme) => ({
  wrapper: {
    display: 'flex',
  },
  star: {
    stroke: theme.colors['grey-scale'][3],

    '&:hover': {
      stroke: theme.colors['bright-blue'][4],
    },
  },
  starActive: {
    fill: theme.colors['bright-blue'][4],
    stroke: theme.colors['bright-blue'][4],
  }
}));

export default useStyles;