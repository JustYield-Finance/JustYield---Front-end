import { Theme } from '@material-ui/core/styles';

export const styles = (theme: Theme) => ({
  vaultTags: {
    marginTop: '4px',
    display: 'flex',
    flexDirection: 'row' as const,
    flexWrap: 'nowrap' as const,
    columnGap: '8px',
    rowGap: '8px',
  },
  vaultTag: {
    ...theme.typography['subline-sm'],
    color: '#2f2f25',
    backgroundColor: '#b3ab7f',
    padding: '2px 8px',
    borderRadius: '4px',
    textTransform: 'uppercase' as const,
    whiteSpace: 'nowrap' as const,
    flexShrink: 0,
    '&:not(:first-child)': {
      flexShrink: 1,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      minWidth: 0,
    },
  },
  vaultTagBoost: {
    backgroundColor: 'rgba(36, 124, 205, 0.3)',
  },
  vaultTagRetired: {
    backgroundColor: 'rgba(46, 172, 184, 0.3)',
  },
  vaultTagPaused: {
    backgroundColor: 'rgba(46, 103, 184, 0.3)',
  },
  vaultTagEarn: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
});
