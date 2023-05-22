import { createStyles, rem } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  listWrapper: {
    maxWidth: theme.other.cardMaxWidth,
    width: '100%',
  },
  loader: {
    margin: theme.other.loaderMargin,
  },
}));

export default useStyles