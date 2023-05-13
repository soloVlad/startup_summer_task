import { createStyles, rem } from "@mantine/core";


const useStyles = createStyles((theme) => ({
  wrapper: {
    width: rem(24),
    height: rem(24),
  },
  star: {
    stroke: '#ACADB9',
  },
  starActive: {
    fill: theme.colors['bright-blue'][4],
    stroke: theme.colors['bright-blue'][4],
  }
}));

export default useStyles;