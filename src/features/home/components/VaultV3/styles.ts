import { Theme } from '@material-ui/core/styles';

export const styles = (theme: Theme) => ({
  icon: {
    position: 'relative' as const,
    display: 'flex',
    flexDirection: 'row' as const,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    flexShrink: 0,
    flexGrow: 0,
    transform: 'translate(0, 0)', // new zIndex context
    '&[data-count="2"]': {
      '& img': {
        '&:nth-child(1)': {
          left: 0,
          zIndex: 2,
        },
        '&:nth-child(2)': {
          right: 0,
          zIndex: 1,
        },
      },
    },
  },
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
    left: '50%',
    transform: 'translate(-50%, -50%)',
    marginTop: '44px',
    width: '50%',
    backgroundColor: 'rgba(46, 172, 184, 0.3)',
  },
  vaultTagPaused: {
    position: 'absolute' as const,
    left: '50%',
    transform: 'translate(-50%, -50%)',
    marginTop: '44px',
    width: '50%',
    backgroundColor: 'rgba(46, 103, 184, 0.3)',
  },
  vaultTagPlatform: {
    position: 'absolute' as const,
    left: '50%',
    transform: 'translate(-50%, -50%)',
    marginTop: '15px',
    width: '50%',
    backgroundColor: 'rgba(0, 153, 0, 0.3)',
  },
  vaultTagPlatform1: {
    position: 'absolute' as const,
    left: '50%',
    transform: 'translate(-50%, -50%)',
    marginTop: '10px',
    width: '50%',
    backgroundColor: 'rgba(0, 153, 0, 0.3)',
  },
  vaultTagPlatform2: {
    position: 'absolute' as const,
    left: '50%',
    transform: 'translate(-50%, -50%)',
    marginTop: '39px',
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
  'vaultNetwork-bsc': {
    backgroundColor: 'rgba(240, 185, 11, 0.4)',
  },
  'vaultNetwork-heco': {
    backgroundColor: 'rgba(2, 148, 63, 0.4)',
  },
  'vaultNetwork-avax': {
    backgroundColor: 'rgba(231, 65, 66, 0.4)',
  },
  'vaultNetwork-polygon': {
    backgroundColor: 'rgba(130, 71, 228, 0.4)',
  },
  'vaultNetwork-fantom': {
    backgroundColor: 'rgba(25, 105, 255, 0.4)',
  },
  'vaultNetwork-harmony': {
    backgroundColor: 'rgba(1, 216, 175, 0.4)',
  },
  'vaultNetwork-arbitrum': {
    backgroundColor: 'rgba(45, 55, 75, 0.4)',
  },
  'vaultNetwork-celo': {
    backgroundColor: 'rgba(53, 207, 127, 0.4)',
  },
  'vaultNetwork-moonriver': {
    backgroundColor: 'rgba(195, 19, 111, 0.4)',
  },
  'vaultNetwork-cronos': {
    backgroundColor: 'rgba(18, 25, 38, 0.4)',
  },
  'vaultNetwork-fuse': {
    backgroundColor: 'rgba(192, 219, 100, 0.4)',
  },
  'vaultNetwork-metis': {
    backgroundColor: 'rgba(0, 218, 204, 0.4)',
  },
  'vaultNetwork-aurora': {
    backgroundColor: 'rgba(112, 212, 75, 0.4)',
  },
  'vaultNetwork-moonbeam': {
    backgroundColor: 'rgba(33, 20, 56, 0.4)',
  },
  'vaultNetwork-emerald': {
    backgroundColor: 'rgba(1, 146, 246, 0.4)',
  },
  'vaultNetwork-optimism': {
    backgroundColor: 'rgba(255, 4, 32, 0.4)',
  },
});
