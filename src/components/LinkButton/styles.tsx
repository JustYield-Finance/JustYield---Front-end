import { Theme } from '@material-ui/core/styles';

export const styles = (theme: Theme) => ({
  link: {
    display: 'inline-flex',
    flexDirection: 'row' as const,
    justifyContent: 'center',
    alignItems: 'center',
    textDecoration: 'none',
    color: theme.palette.text.secondary,
    padding: '2px 8px',
    borderRadius: '4px',
    '& $icon:first-child': {
      marginRight: '4px',
    },
    '& $icon:last-child': {
      marginLeft: '4px',
    },
    '&:hover': {
      color: theme.palette.text.primary,
      transition: 'color 0.1s',
    },
  },
  icon: {},
});
