import { rem, createStyles, getStylesRef } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  filtersWrapper: {
    maxWidth: rem(315),
    width: '100%',
    minHeight: rem(360),
    padding: theme.spacing.xl,
  },
  formTitleWrapper: {
    marginBottom: rem(12),
  },
  formTitle: {
    fontWeight: 700,
    fontSize: rem(20),
    lineHeight: rem(20),
  },
  closeButton: {
    cursor: 'pointer',
    color: theme.other.grey500Color,
    fontWeight: 500,

    '&:hover': {
      color: theme.colors['bright-blue'][4],
      [`.${getStylesRef('closeButtonIcon')}`]: {
        stroke: theme.colors['bright-blue'][4],
      }
    },
  },
  closeButtonText: {
    lineHeight: rem(20),
  },
  closeButtonIcon: {
    ref: getStylesRef('closeButtonIcon'),
    color: theme.other.grey500Color,
    stroke: theme.colors['grey-scale'][3],
  },
  label: {
    fontWeight: 700,
    fontSize: rem(16),
    lineHeight: rem(19),
    marginBottom: rem(8),
  },
  input: {
    lineHeight: rem(20),
    padding: `${rem(11)} ${rem(12)}`,
    height: rem(42),

  },
  selectArrow: {
    stroke: theme.colors['grey-scale'][3],
    pointerEvents: 'none',
  },
  submitButton: {
    paddingTop: rem(9.5),
    paddingBottom: rem(9.5),
  }
}));

export default useStyles;