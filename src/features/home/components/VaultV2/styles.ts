import { Theme } from '@material-ui/core/styles';

export const styles = (theme: Theme) => ({
  vault: {
    position: 'relative' as const,
    width: '100%',
    color: '#6a6a4d',
    textDecoration: 'none',
    '&:last-child': {
      borderBottom: 0,
      borderBottomLeftRadius: '8px',
      borderBottomRightRadius: '8px',
      backgroundClip: 'padding-box',
    },
  },
  sizeEmpty: {
    height: '27px',
  },
  vaultDetails: {
    marginLeft: '25px',
    marginRight: '25px',
  },
  vaultIcon: {
    padding: '1px',
    width: '30px',
    height: '30px',
  },
  vaultRetired: {},
  vaultEarnings: {},
  vaultTagRetired: {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    marginTop: '10px',
    width: '50%',
    backgroundColor: 'rgba(46, 172, 184, 0.3)',
  },
  vaultTagPaused: {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    marginTop: '10px',
    width: '50%',
    backgroundColor: 'rgba(46, 103, 184, 0.3)',
  },
  vaultTagPlatform: {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    marginTop: '44px',
    width: '50%',
    backgroundColor: 'rgba(0, 153, 0, 0.3)',
  },
  vaultInner: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    columnGap: '24px',
    rowGap: '24px',
    width: '100%',
    [theme.breakpoints.up('lg')]: {
      gridTemplateColumns: 'minmax(0, 30fr) minmax(0, 70fr)',
    },
  },
});
