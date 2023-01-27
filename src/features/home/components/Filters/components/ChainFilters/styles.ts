import { Theme } from '@material-ui/core/styles';

export const styles = (theme: Theme) => ({
  selector: {
    display: 'flex',
    flexDirection: 'row' as const,
    flexWrap: 'nowrap' as const,
    columnGap: theme.spacing(2),
    rowGap: theme.spacing(2),
  },
  icon: {
    width: '35px',
    height: '35px',
    display: 'block',
    margin: '0 auto',
  },
  button: {
    background: 'transparent',
    border: 'none',
    flexGrow: 1,
    flexShrink: 0,
    padding: `${12 - 2}px 0`,
    cursor: 'pointer',
    '&:not($selected) $icon': {
      '& .bg': {
        fill: '#d1cdb3',
      },
      '& .fg': {
        fill: '#e4e1ce',
      },
    },
  },
  selected: {
    background: '#d9ecf2',
  },
  tooltip: {
    ...theme.typography['body-lg-med'],
    background: theme.palette.background.filters.outline,
    padding: '8px 12px',
    borderRadius: '4px',
    color: theme.palette.text.disabled,
    margin: '4px 0',
  },
  iconWithChain: {
    display: 'flex',
    alignItems: 'center',
  },
  iconWithChainIcon: {
    marginRight: '8px',
  },
  iconWithChainSelected: {
    '& $iconWithChainIcon': {
      marginRight: '4px',
    },
  },
});
