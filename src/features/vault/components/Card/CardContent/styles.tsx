import { Theme } from '@material-ui/core/styles';

export const styles = (theme: Theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    backgroundColor: 'rgba(238,236,222,0.5)',
    borderRadius: '0 0 12px 12px',
    padding: '24px',
  },
});
