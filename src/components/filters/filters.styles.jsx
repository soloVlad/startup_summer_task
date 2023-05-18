import { rem, createStyles, getStylesRef } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  filtersWrapper: {
    maxWidth: rem(315),
    width: '100%',
    minHeight: rem(360),
    padding: theme.spacing.xl,

    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    }
  },
  filtersOpened: {
    [theme.fn.smallerThan('sm')]: {
      display: 'block',
    }
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
  selectRight: {
    pointerEvents: 'none',
  },
  selectArrow: {
    transition: theme.other.defaultTransition,
    ref: getStylesRef('selectArrow'),
    stroke: theme.colors['grey-scale'][3],
  },
  selectArrowActive: {
    stroke: theme.colors['bright-blue'][4],
    transform: 'rotate(180deg)',
  },
  dropdownWrapper: {

  },
  dropdownItem: {
    padding: rem(8),
    borderRadius: rem(8),
    lineHeight: rem(20),
    transition: theme.other.defaultTransition,

    '&[data-selected]': {
      paddingLeft: rem(12),
      paddingRight: rem(12),
      backgroundColor: theme.colors['bright-blue'][4],
      fontWeight: 500,
    },

    '&:hover': {
      paddingLeft: rem(12),
      paddingRight: rem(12),
      backgroundColor: theme.colors['bright-blue'][0],
    },
  },
  submitButton: {
    paddingTop: rem(9.5),
    paddingBottom: rem(9.5),
  },
  toggleFilters: {
    display: 'none',
    padding: `${rem(8)} ${rem(12)}`,

    [`@media (max-width: ${theme.breakpoints.sm - 1}px)`]: {
      display: 'block',
    }
  },
}));

export default useStyles;