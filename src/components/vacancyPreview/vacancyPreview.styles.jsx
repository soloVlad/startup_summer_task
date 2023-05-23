import { createStyles, rem } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  cardLink: {
    cursor: 'pointer',
  },
  titleWrapper: {
    justifyContent: 'space-between',
  },
  profession: {
    color: theme.colors['bright-blue'][4],
  },
  infoWrapper: {
    alignItems: 'center',

    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    }
  },
  typeOfWork: {
    fontWeight: 400,
    fontSize: rem(16),
    lineHeight: rem(20),
  },
  dotIconWrapper: {
    width: rem(9),

    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    }
  },
  dotIcon: {
    width: rem(5),
    height: rem(5),
  },
  geoWrapper: {
    alignItems: 'center',
  },
  geoIcon: {
    width: rem(20),
    height: rem(20),
  },

  professionInFull: {
    fontWeight: 700,
    fontSize: rem(28),
    lineHeight: rem(34),
    color: theme.black,
  },
  paymentInFull: {
    fontWeight: 700,
    fontSize: rem(20),
    lineHeight: rem(20),
  },
  typeOfWorkInFull: {
    fontSize: rem(20),
    lineHeight: rem(20),
  },
}));

export default useStyles;