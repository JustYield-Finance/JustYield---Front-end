import { Theme } from '@material-ui/core/styles';

export const styles = (theme: Theme) => ({
  container: {},
  title: {
    ...theme.typography['h1'],
    fontSize: '45px',
    lineHeight: '56px',
    color: '#0a0a00',
  },
  text: {
    ...theme.typography['body-lg'],
    color: '#2f2f25',
    marginTop: '32px',
    '& p': {
      marginTop: 0,
      marginBottom: '1em',
      '&:last-child': {
        marginBottom: 0,
      },
    },
  },
  poweredBy: {
    marginTop: '64px',
  },
  poweredByLabel: {
    ...theme.typography['subline-sm'],
    color: '#66634c',
    marginTop: '32px',
  },
  poweredByLogos: {
    marginTop: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '32px',
  },
});
