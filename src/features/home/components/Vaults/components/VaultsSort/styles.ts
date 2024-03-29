import { Theme } from '@material-ui/core/styles';

export const styles = (theme: Theme) => ({
  sortColumns: {
    display: 'grid',
    width: '100%',
    columnGap: '10px',
    gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
  },
  sortColumn: {
    ...theme.typography['subline-sm'],
    color: '#757157',
    display: 'flex',
    alignItems: 'center' as const,
    justifyContent: 'flex-end' as const,
    textAlign: 'right' as const,
    background: 'transparent',
    border: 'none',
    boxShadow: 'none',
    padding: 0,
    cursor: 'pointer',
  },
  sortTooltipIcon: {
    width: '20px',
    height: '20px',
    flexShrink: 0,
    marginLeft: '4px',
    '& svg': {
      width: '20px',
      height: '20px',
    },
  },
  sortIcon: {
    marginLeft: '8px',
    width: '9px',
    height: '12px',
    fill: 'currentColor',
    display: 'block',
  },
  sortIconHighlight: {
    fill: '#0a0a00',
  },
  sortDropdown: {
    backgroundColor: 'rgba(238,236,222,0.5)',
    border: 'solid 2px #c6c09f',
    [theme.breakpoints.up('md')]: {
      width: '100%',
      maxWidth: '100%',
      marginLeft: 'auto',
    },
  },
});
