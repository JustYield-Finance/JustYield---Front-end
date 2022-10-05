import { Theme } from '@material-ui/core/styles';

export const styles = (theme: Theme) => ({
  icon: {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    marginRight: '8px',
  },
  iconLoading: {
    background: 'rgba(0, 0, 0, 0.12);',
  },
  iconProvider: {
    background: 'red',
  },
  provider: {
    marginRight: '8px',
  },
  rate: {
    ...theme.typography['body-sm'],
    color: '#66634c',
    marginRight: '8px',
  },
  arrow: {
    marginLeft: 'auto',
    color: '#2f2f25',
    height: '24px',
  },
});
