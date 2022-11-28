import { Theme } from '@material-ui/core/styles';

export const styles = (theme: Theme) => ({
  checkbox: {
    ...theme.typography['body-sm-med'],
    display: 'flex',
    alignItems: 'center',
    color: '#2f2f25',
    cursor: 'pointer',
  },
  icon: {
    color: '#7b7452',
    marginRight: `${8 - 3}px`,
  },
  label: {
    display: 'flex',
    alignItems: 'center',
  },
  checked: {
    '& $icon': {
      color: '#0a0a00',
    },
  },
});
