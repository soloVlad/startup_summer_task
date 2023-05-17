const { createStyles, rem } = require("@mantine/core");

const useStyles = createStyles((theme) => ({
  wrapper: {
    alignItems: 'center',
  },
  description: {
    fontSize: rem(16),

    '& b': {
      fontWeight: 700,
      fontSize: rem(20),
      lineHeight: rem(20),
    },
  }
}));

export default useStyles;