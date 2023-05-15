import { rem, createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  header: {
    height: rem(84),
  },
  headerContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
  },
  logo: {
    marginRight: `min(25% ,${rem(280)})`
  },
  menu: {
    columnGap: rem(60),
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