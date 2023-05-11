import { Group, Anchor, rem, Flex, Container, createStyles, Paper } from "@mantine/core";
import { Link, useLocation } from "react-router-dom";

import Logo from "../logo/logo.component";

const LINKS = [
  {
    name: 'Поиск Вакансий',
    URL: '/'
  },
  {
    name: 'Избранное',
    URL: '/fav'
  }
];

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
    marginRight: `min(25% ,${rem(270)})`
  },
  menu: {
    columnGap: rem(60),
  },
  menuItem: {
    fontWeight: 500,
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

const Header = () => {
  const { classes } = useStyles();
  const { pathname } = useLocation();

  return (
    <Paper className={classes.header}>
      <Container className={classes.headerContainer}>
        <Flex className={classes.logo} >
          <Logo />
        </Flex>
        <Group className={classes.menu}>
          {
            LINKS.map(link => (
              <Anchor
                component={Link}
                to={link.URL}
                className={`${classes.menuItem} ${link.URL === pathname ? classes.menuItemActive : ''}`}
              >
                {link.name}
              </Anchor>
            ))
          }
        </Group>
      </Container>
    </Paper>
  );
};

export default Header;