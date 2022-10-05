import { Theme } from '@material-ui/core/styles';

export const styles = (theme: Theme) => ({
  container: {
    background: '#dcd8bc',
    borderRadius: '12px',
    width: '100%',
    height: props => props.cardHeight,
    display: 'flex',
    flexDirection: 'column' as const,
  },
  titleBar: {
    ...theme.typography['body-lg-med'],
    color: '#2f2f25',
    background: '#eeecde',
    padding: '24px',
    borderTopLeftRadius: '12px',
    borderTopRightRadius: '12px',
    borderBottom: 'solid 2px #c9c49c',
    display: 'flex',
    columnGap: '12px',
    alignItems: 'center',
  },
  backButton: {
    margin: 0,
    padding: 0,
    borderRadius: '50%',
    width: '24px',
    height: '24px',
    background: '#c9c49c',
    boxShadow: 'none',
    cursor: 'pointer',
    border: 'none',
    color: '#0a0a00',
    flexShrink: 0,
    flexGrow: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fill: '#0a0a00',
    width: '12px',
    height: '9px',
  },
  adornment: {
    marginLeft: 'auto',
  },
  tokenIcon: {
    flexShrink: 0,
    flexGrow: 0,
    marginRight: '8px',
  },
  content: {
    padding: '24px',
    height: '462px',
    display: 'flex',
    flexDirection: 'column' as const,
    flexGrow: 1,
  },
  noPadding: {
    padding: 0,
  },
});
