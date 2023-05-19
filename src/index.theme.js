import { rem } from "@mantine/core";

const theme = {
  breakpoints: {
    sm: 790,
  },
  defaultRadius: rem(8),
  fontFamily: 'Inter, sans-serif',
  fontSizes: {
    md: rem(14),
  },
  spacing: {
    sm: rem(8),
    md: rem(12),
    lg: rem(15),
    xl: rem(19),
  },
  white: '#FFF',
  black: '#232134',
  colors: {
    'bright-blue': ['#DEECFF', '#C9E0FF', '#B7D6FF', '#92C1FF', '#5E96FC', '#3B7CD3', '#3B7CD3', '#3B7CD3', '#3B7CD3', '#3B7CD3'],
    'grey-scale': ['#F5F5F6', '#EAEBED', '#D5D6DC', '#ACADB9', '#7B7C88', '#343A40', '#343A40', '#343A40', '#343A40', '#343A40'],
  },
  primaryColor: 'bright-blue',
  headings: {
    fontWeight: 600,
    fontFamily: 'Inter, sans-serif',

    sizes: {
      h1: { fontSize: rem(24), lineHeight: rem(36) },
      h2: { fontSize: rem(20), lineHeight: rem(24) },
      h3: { fontSize: rem(16), lineHeight: rem(20) },
      h4: { fontWeight: 400, fontSize: rem(16), lineHeight: rem(19) },
    }
  },
  loader: 'dots',
  components: {
    Container: {
      defaultProps: {
        sizes: {
          md: 1148,
        }
      }
    },
    Button: {
      styles: (theme) => ({
        root: {
          height: 'auto',
          backgroundColor: theme.colors['bright-blue'][4],
          fontWeight: 500,
          fontSize: theme.fontSizes.md,
          border: 'none'
        },
        inner: {
          height: 'auto',
        },
        label: {
          lineHeight: rem(21),
        }
      })
    },
  },
  other: {
    cardRadius: rem(12),
    cardPadding: rem(24),
    cardMaxWidth: rem(773),
    cardBorderColor: '#EAEBED',
    grey500Color: '#ACADB9',
    defaultTransition: '0.2s ease all',
    loaderMargin: '20% auto',
  }
}

export default theme;