import { createStyles, rem } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  wrapper: {
    maxWidth: rem(328),
  },
  text: {
    textAlign: 'center',
    color: theme.colors['grey-scale'][5],
    fontWeight: 700,
    fontSize: rem(24),
    lineHeight: rem(29),
  },
  button: {
    minHeight: rem(42),
    padding: `${rem(10)} ${rem(24)}`,
    backgroundColor: theme.colors['bright-blue'][0],
    fontFamily: 'Open Sans, sans-serif',
    fontWeight: 600,
    color: theme.colors['bright-blue'][5],
    lineHeight: rem(21),
  }
}));

export default useStyles;