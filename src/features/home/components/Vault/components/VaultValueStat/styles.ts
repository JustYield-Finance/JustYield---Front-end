import { Theme } from '@material-ui/core/styles';

export const styles = (theme: Theme) => ({
  value: {
    ...theme.typography['body-lg-med'],
    color: '#2f2f25',
  },
  subValue: {
    ...theme.typography['body-sm'],
    color: '#757157',
  },
  blurValue: {
    filter: 'blur(.5rem)',
  },
  boostedValue: {
    color: '#247ccd',
  },
  lineThroughValue: {
    textDecoration: 'line-through',
  },
});
