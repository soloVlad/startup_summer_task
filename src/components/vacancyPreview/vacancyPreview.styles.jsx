import { createStyles, rem } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  titleWrapper: {
    justifyContent: 'space-between',
  },
  profession: {
    color: theme.colors['bright-blue'][4],
  },
  starIconWrapper: {
    width: rem(24),
    height: rem(24),
  },
  infoWrapper: {
    alignItems: 'center',
  },
  typeOfWork: {
    fontWeight: 400,
    fontSize: rem(16),
    lineHeight: rem(20),
  },
  dotIconWrapper: {
    width: rem(9),
  },
  dotIcon: {
    width: rem(5),
    height: rem(5),
  },
  geoWrapper: {
    alignItems: 'center',
  },
  geoIconWrapper: {
    width: rem(20),
    height: rem(20),
  },
  geoIcon: {
    width: rem(13.3),
    height: rem(16.1),
  },
}));

export default useStyles;