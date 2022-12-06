import { Theme } from '@material-ui/core/styles';

export const styles = (theme: Theme) => ({
  select: {
    ...theme.typography['body-lg-med'],
    backgroundColor: '#eeecde',
    border: 'solid 2px #cfcaaf',
    borderRadius: '8px',
    minWidth: 0,
    width: 'fit-content',
    color: '#2f2f25',
    padding: `${8 - 2}px ${16 - 2}px`,
    cursor: 'pointer',
    userSelect: 'none' as const,
    boxShadow: 'none',
    textAlign: 'left' as const,
    '&:hover': {
      boxShadow: 'none',
    },
  },
  selectCurrent: {
    display: 'flex',
    minWidth: 0,
  },
  selectLabel: {
    flexShrink: 0,
    flexGrow: 0,
    color: '#757157',
    marginRight: '4px',
  },
  selectValue: {
    flexShrink: 1,
    flexGrow: 0,
    minWidth: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap' as const,
    marginRight: '4px',
    display: 'flex',
    alignItems: 'center',
  },
  selectIcon: {
    flexShrink: 0,
    flexGrow: 0,
    marginLeft: 'auto',
    fill: '#2f2f25',
  },
  selectFullWidth: {
    width: '100%',
  },
  selectBorderless: {
    borderWidth: 0,
    padding: `8px 16px`,
  },
  selectOpen: {
    '& $selectIcon': {
      transform: 'rotateX(180deg)',
    },
  },
  dropdown: {
    ...theme.typography['body-lg-med'],
    zIndex: 1000,
    border: '2px solid #c6c09f',
    borderRadius: '8px',
    backgroundColor: '#eeecde',
    padding: `${8 - 2}px 0`,
    color: '#2f2f25',
    maxWidth: '100%',
    maxHeight: '100%',
    overflowX: 'hidden' as const,
    overflowY: 'auto' as const,
    minHeight: '100px',
  },
  dropdownItem: {
    display: 'flex',
    alignItems: 'center',
    minWidth: 0,
    userSelect: 'none' as const,
    cursor: 'pointer',
    padding: `8px ${16 - 2}px`,
    '& svg': {
      marginRight: '8px',
    },
    '&:hover': {
      background: 'rgba(0, 0, 0, 0.16)',
      color: '#2f2f25',
    },
    '&:active': {
      background: 'transparent',
      color: '#2f2f25',
    },
  },
  dropdownItemSelected: {
    color: '#2f2f25',
  },
});
