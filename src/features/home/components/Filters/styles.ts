import { Theme } from '@material-ui/core/styles';

export const styles = (theme: Theme) => ({
  filters: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    rowGap: '16px',
    columnGap: '16px',
  },
  userCategory: {
    width: '100%',
    background: '#eeecde',
    [theme.breakpoints.up('lg')]: {
      width: 'fit-content',
      marginRight: 'auto',
    },
  },
  chain: {
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 'fit-content',
      flexBasis: '25%',
      flexShrink: 1,
      flexGrow: 1,
    },
    [theme.breakpoints.up('lg')]: {
      width: '100%',
      flexBasis: '100%',
      flexShrink: 0,
    },
    background: 'rgba(238,236,222,0.5)',
  },
  vaultType: {
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 'fit-content',
      flexBasis: '25%',
      flexShrink: 1,
      flexGrow: 1,
    },
    [theme.breakpoints.up('lg')]: {
      flexBasis: 'auto',
      flexShrink: 0,
      flexGrow: 0,
    },
  },
  vaultCategory: {
    background: '#eeecde',
  },
  extended: {
    background: '#eeecde',
  },
  clear: {
    background: '#eeecde',
  },
  button: {
    width: 'auto',
    flexBasis: 'calc(50% - 8px)',
    flexShrink: 0,
    flexGrow: 1,
    [theme.breakpoints.up('md')]: {
      flexBasis: 'auto',
      flexGrow: 0,
      flexShrink: 0,
    },
  },
});
