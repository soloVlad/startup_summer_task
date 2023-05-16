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
      //       <ArrowUp />
      //     </ActionIcon>
      //     <ActionIcon variant='transparent' size={rem(12)}>
      //       <ArrowDown />
      //     </ActionIcon>
      //   </Stack>
      // }
      rightSectionWidth={rem(34)}
      classNames={classNames}
      className={`${className}`}
    />
  );
};

export default InputWithArrows; 