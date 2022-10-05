import { Theme } from '@material-ui/core/styles';

export const styles = (theme: Theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center' as const,
    width: '100%',
    height: '100%',
  },
  circle: {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    background: 'rgba(46, 172, 184, 0.15)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    color: '#2eacb8',
    fontSize: '30px',
  },
  title: {
    ...theme.typography.h3,
    color: '#0a0a00',
    marginTop: '24px',
  },
  content: {
    ...theme.typography['body-lg'],
    color: '#2f2f25',
    marginTop: '24px',
  },
});
