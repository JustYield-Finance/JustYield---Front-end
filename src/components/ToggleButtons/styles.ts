import { Theme } from '@material-ui/core/styles';

export const styles = (theme: Theme) => ({
  buttons: {
    display: 'flex',
    width: 'fit-content',
    border: 'solid 2px #cfcaaf',
    borderRadius: '8px',
    backgroundColor: '#d9d5bf',
  },
  fullWidth: {
    width: '100%',
  },
  button: {
    ...theme.typography['body-lg-med'],
    color: '#757157',
    backgroundColor: 'inherit',
    border: 'none',
    borderRadius: '6px',
    boxShadow: 'none',
    cursor: 'pointer',
    margin: 0,
    padding: `6px 16px`,
    flexGrow: 1,
    flexShrink: 0,
    '&:hover': {
      color: '#2f2f25',
      backgroundColor: 'rgba(10, 10, 0, 0.08)',
      boxShadow: 'none',
    },
    '&:active, &:hover:active': {
      color: '#000000',
      backgroundColor: theme.palette.primary.main,
    },
  },
  selected: {
    pointerEvents: 'none' as const,
    color: '#000000',
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      color: '#000000',
      backgroundColor: theme.palette.primary.main,
    },
  },
  untogglable: {
    padding: `${8 - 2}px ${16 - 12 - 2}px`,
    '& $button': {
      padding: '0 12px',
      '&:hover': {
        color: '#2f2f25',
        backgroundColor: 'transparent',
      },
      '&:active, &:hover:active': {
        color: '#000000',
        backgroundColor: 'transparent',
      },
      '&$selected': {
        pointerEvents: 'all' as const,
        color: '#000000',
        backgroundColor: 'transparent',
        '&:hover': {
          color: '#000000',
          backgroundColor: 'transparent',
        },
      },
    },
  },
});
