import { Theme } from '@material-ui/core/styles';

export const styles = (theme: Theme) => ({
  input: {
    color: '#2f2f25',
    background: '#e4e1ce',
    borderRadius: '8px',
    width: '100%',
    display: 'flex',
    border: 'solid 2px #e4e1ce',
    '& .MuiInputBase-input': {
      ...theme.typography['h2'],
      padding: `${8 - 2}px 16px`,
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
  error: {
    borderColor: '#D15347',
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
