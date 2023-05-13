import { Flex, Title } from "@mantine/core";
import { Link } from "react-router-dom";

import { ReactComponent as LogoIcon } from '../../assets/icons/logo.svg';

import useStyles from "./logo.styles";

const Logo = ({ className }) => {
  const { classes } = useStyles();

  return (
    <Flex className={className}
      component={Link}
      to='/'
      align='center'
      gap='md'
    >
      <LogoIcon className={classes.logoIcon} />
      <Title order={1} className={classes.logoText}>Jobored</Title>
    </Flex>
  );
};

export default Logo;