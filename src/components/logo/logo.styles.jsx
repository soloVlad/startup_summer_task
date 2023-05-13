import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  logoText: {
    letterSpacing: '-0.02em',
    fontFamily: 'Poppins, sans-serif',
  },
  logoIcon: {
    fill: theme.colors['bright-blue'][4],
  }
}));

export default useStyles;