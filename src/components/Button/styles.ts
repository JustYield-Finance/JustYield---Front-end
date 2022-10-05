import { Theme } from '@material-ui/core/styles';

const borderWidth = 2;
const paddings: Record<string, Record<'x' | 'y', number>> = {
  sm: {
    x: 16,
    y: 8,
  },
  lg: {
    // default
    x: 24,
    y: 12,
  },
};

export const styles = (theme: Theme) => ({
  button: {
    ...theme.typography['body-lg-med'],
    // colors set on variants
    color: 'red',
    backgroundColor: 'blue',
    border: `solid ${borderWidth}px green`,
    borderRadius: '8px',
    minWidth: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 'fit-content',
    margin: 0,
    padding: `${paddings.lg.y - borderWidth}px ${paddings.lg.x - borderWidth}px`,
    cursor: 'pointer',
    userSelect: 'none' as const,
    boxShadow: 'none',
    textAlign: 'center' as const,
    textDecoration: 'none',
    '&:disabled': {
      color: 'rgba(0, 0, 0, 0.38)',
      backgroundColor: 'rgba(0, 0, 0, 0.12)',
      borderColor: 'rgba(0, 0, 0, 0.12)',
      pointerEvents: 'none',
    },
  },
  borderless: {
    borderWidth: 0,
    padding: `${paddings.lg.y}px ${paddings.lg.x}px`,
  },
  fullWidth: {
    width: '100%',
  },
  active: {},
  sm: {
    padding: `${paddings.sm.y - borderWidth}px ${paddings.sm.x - borderWidth}px`,
    '&$borderless': {
      padding: `${paddings.sm.y}px ${paddings.sm.x}px`,
    },
  },
  default: {
    color: '#0a0a00',
    backgroundColor: '#dcd8bc',
    borderColor: '#dcd8bc',
    '&:hover': {
      color: '#0a0a00',
      backgroundColor: '#d3ceab',
      borderColor: '#d3ceab',
    },
  },
  light: {
    color: '#0a0a00',
    backgroundColor: '#c9c49c',
    borderColor: '#c9c49c',
    '&:hover': {
      color: '#0a0a00',
      backgroundColor: '#c0ba8b',
      borderColor: '#c0ba8b',
    },
  },
  success: {
    color: '#FFFFFF',
    backgroundColor: '#85bf4b',
    borderColor: '#85bf4b',
    '&:hover': {
      color: '#FFFFFF',
      backgroundColor: '#68a871',
      borderColor: '#68a871',
    },
  },
  filter: {
    color: '#757157',
    backgroundColor: '#d9d5bf',
    borderColor: '#cfcaaf',
    '&:hover': {
      color: '#2f2f25',
      backgroundColor: '#d9d5bf',
      borderColor: '#cfcaaf',
    },
    '&:active, &$active': {
      color: '#0a0a00',
      backgroundColor: '#cfcaaf',
      borderColor: '#cfcaaf',
    },
    '&:disabled': {
      color: '#757157',
      backgroundColor: '#d9d5bf',
      borderColor: '#cfcaaf',
      opacity: 0.4,
    },
  },
});
