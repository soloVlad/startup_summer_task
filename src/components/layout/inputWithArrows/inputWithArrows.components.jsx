import { ActionIcon, NumberInput, Stack, rem } from "@mantine/core";
import useStyles from "./inputWithArrows.styles";

import { ReactComponent as ArrowUp } from '../../../assets/icons/arrowUp.svg';
import { ReactComponent as ArrowDown } from '../../../assets/icons/arrowDown.svg';

const InputWithArrows = ({ className, label, placeholder, classNames }) => {
  const { classes } = useStyles();

  return (
    <NumberInput
      label={label}
      placeholder={placeholder}
      // rightSection={
      //   <Stack spacing={rem(2)}>
      //     <ActionIcon variant='transparent' size={rem(12)}>
      //       <ArrowUp className={classes.numberArrow} />
      //     </ActionIcon>
      //     <ActionIcon variant='transparent' size={rem(12)}>
      //       <ArrowDown className={classes.numberArrow} />
      //     </ActionIcon>
      //   </Stack>
      // }
      rightSectionWidth={rem(34)}
      classNames={{
        ...classNames,
        rightSection: classes.rightSection,
        control: classes.control,
        controlUp: classes.controlUp,
        controlDown: classes.controlDown,
      }}
      className={`${className}`}
    />
  );
};

export default InputWithArrows; 