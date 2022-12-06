import { Theme } from '@material-ui/core/styles';

export const styles = (theme: Theme) => ({
  search: {
    color: '#2f2f25',
    background: '#eeecde',
    border: 'solid 2px #c6c09f',
    borderRadius: '8px',
    '& .MuiInputBase-input': {
      padding: '8px 16px',
      color: '#2f2f25',
      height: 'auto',
      '&:focus': {
        color: '#0a0a00',
      },
      '&::placeholder': {
        color: '#757157',
        opacity: 1,
      },
    },
  },
  icon: {
    background: 'transparent',
    padding: 0,
    border: 0,
    margin: '0 16px 0 0',
    boxShadow: 'none',
    lineHeight: 'inherit',
    display: 'flex',
    alignItems: 'center',
    color: '#2f2f25',
    flexShrink: 0,
    width: '24px',
    height: '24px',
    'button&': {
      cursor: 'pointer',
    },
  },
});
