import { Theme } from '@material-ui/core';

export const styles = (theme: Theme) => ({
  container: {
    ...theme.typography['body-lg-med'],
    backgroundColor: theme.palette.background.footer,
    paddingBottom: theme.spacing(3),
  },
  icon: { marginRight: theme.spacing(1), height: '24px' },
  box: {
    backgroundColor: 'rgba(115, 108, 64, 0.1)',
    borderRadius: '8px',
    padding: '16px',
    display: 'flex',
    justifyContent: 'center',
  },
  content: {
    display: 'flex',
    alignItems: 'flex-start',
    flexGrow: 1,
    justifyContent: 'center',
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
  },
  cross: {
    fill: '#2f2f25',
    '&:hover': {
      cursor: 'pointer',
    },
  },
});
