import { rem, createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  header: {
    height: rem(84),
  },
  headerContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',

    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column',
    }
  },
  logo: {
    marginRight: `min(25% ,${rem(280)})`,

    [theme.fn.smallerThan('xs')]: {
      marginRight: 0,
      flex: 1,
    }
  },
  menu: {
    columnGap: rem(60),

    [theme.fn.smallerThan('xs')]: {
      paddingBottom: rem(10),
      columnGap: rem(30),
    }
  },
  menuItem: {
    fontWeight: 500,
    fontSize: rem(16),
    lineHeight: rem(20),
    color: theme.black,

    '&:hover': {
      textDecoration: 'none',
    }
  },
  menuItemActive: {
    color: theme.colors['bright-blue'][4],
  }
}));

export default useStyles;