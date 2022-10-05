import { Theme } from '@material-ui/core';

export const styles = (theme: Theme) => ({
  holder: {
    ...theme.typography['subline-sm'],
    color: '#2f2f25',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
