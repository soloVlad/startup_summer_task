import { NumberInput, rem } from "@mantine/core";
import useStyles from "./inputWithArrows.styles";

const InputWithArrows = ({ className, label, placeholder, classNames, ...otherProps }) => {
  const { classes } = useStyles();

  return (
    <NumberInput
      label={label}
      placeholder={placeholder}
      min={0}
      step={100}
      rightSectionWidth={rem(34)}
      {...otherProps}
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