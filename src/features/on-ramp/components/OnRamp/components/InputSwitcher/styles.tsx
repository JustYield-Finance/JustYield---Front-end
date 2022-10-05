import { Theme } from '@material-ui/core/styles';

export const styles = (theme: Theme) => ({
  switcher: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    columnGap: '12px',
    '&::before, &::after': {
      content: '""',
      display: 'block',
      background: '#d2ceac',
      height: '2px',
      width: '1px',
      flexShrink: '0',
      flexGrow: '1',
    },
  },
  button: {
    width: 28,
    height: 28,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#0a0a00',
    background: '#c9c49c',
    border: 'none',
    borderRadius: '50%',
    boxShadow: 'none',
    padding: 0,
    margin: 0,
    cursor: 'pointer',
    userSelect: 'none' as const,
    outline: 'none',
  },
  icon: {
    width: 15,
    height: 13,
    fill: '#0a0a00',
  },
});
