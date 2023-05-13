import { Group, Anchor, rem, Flex, Container, createStyles, Paper } from "@mantine/core";
import { Link, useLocation } from "react-router-dom";

import LINKS from "../../constants/menuLinks";

import Logo from "../logo/logo.component";

import useStyles from "./header.styles";


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