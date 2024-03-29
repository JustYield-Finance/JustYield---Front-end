import { Theme } from '@material-ui/core/styles';

export const styles = (theme: Theme) => ({
  header: {
    display: 'grid',
    columnGap: '24px',
    rowGap: '16px',
    width: '100%',
    color: '#6a6a4d',
    gridTemplateColumns: '1fr',
    alignItems: 'center',
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
    borderBottomLeftRadius: '8px',
    borderBottomRightRadius: '8px',
    backgroundClip: 'padding-box',
    [theme.breakpoints.up('sm')]: {
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    },
    [theme.breakpoints.up('lg')]: {
      gridTemplateColumns: 'minmax(0, 30fr) minmax(0, 30fr) minmax(0, 40fr)',
    },
  },
});
