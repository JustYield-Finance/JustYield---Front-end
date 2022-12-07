import { Theme } from '@material-ui/core/styles';

export const styles = (theme: Theme) => ({
  selector: {
    background: '#eeecde',
    border: 'solid 2px #c6c09f',
    zIndex: 0,
  },
  icon: {
    width: '40px',
    height: '40px',
    display: 'block',
    margin: '0 auto',
  },
  animatedButton: {
    border: 'none',
  },
  button: {
    background: 'transparent',
    border: 'none',
    flexGrow: 1,
    flexShrink: 0,
    paddingBottom: `${12 - 2}px 0`,
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
  selected: {},
  tooltip: {
    ...theme.typography['body-lg-med'],
    background: '#eeecde',
    border: 'solid 2px #c6c09f',
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
