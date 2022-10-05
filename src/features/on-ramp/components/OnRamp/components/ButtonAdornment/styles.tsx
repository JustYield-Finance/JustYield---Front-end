import { Theme } from '@material-ui/core/styles';

export const styles = (theme: Theme) => ({
  button: {
    ...theme.typography['body-lg-med'],
    color: '#2f2f25',
    background: 'transparent',
    border: 'none',
    boxShadow: 'none',
    outline: 'none',
    display: 'flex',
    alignItems: 'center',
    margin: 0,
    padding: 0,
    cursor: 'pointer' as const,
    '&:hover, &:focus-visible': {
      color: '#0a0a00',
      '& $arrow': {
        color: '#2f2f25',
      },
    },
  },
  arrow: {
    color: '#66634c',
    height: '24px',
  },
});
