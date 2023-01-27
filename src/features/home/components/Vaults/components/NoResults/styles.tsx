import { Theme } from '@material-ui/core/styles';

export const styles = (theme: Theme) => ({
  message: {
    padding: '24px',
    background: 'rgba(238,236,222,0.5)',
    boxShadow: '0 2px 10px rgba(0,0,0,0.5)',
    borderBottomLeftRadius: '8px',
    borderBottomRightRadius: '8px',
  },
  title: {
    ...theme.typography['h3'],
    color: '#2f2f25',
    margin: '0 0 4px 0',
  },
  text: {
    ...theme.typography['body-lg'],
    color: '#2f2f25',
  },
  extra: {
    marginTop: '24px',
  },
});
