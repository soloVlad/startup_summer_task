import { Flex, Title, createStyles, rem, em } from "@mantine/core";
import { Link } from "react-router-dom";

import { ReactComponent as LogoIcon } from '../../assets/icons/logo.svg';

const useStyles = createStyles((theme) => ({
  logoText: {
    letterSpacing: '-0.02em',
    fontFamily: 'Poppins, sans-serif',
  },
  logoIcon: {
    fill: theme.colors['bright-blue'][4],
  }
}));

const Logo = ({ className }) => {
  const { classes } = useStyles();

  return (
    <Flex className={className}
      component={Link}
      to='/'
      align='center'
      gap={rem(12)}
    >
      <LogoIcon className={classes.logoIcon} />
      <Title order={1} className={classes.logoText}>Jobored</Title>
    </Flex>
  );
};

export default Logo;