import { Theme } from '@material-ui/core/styles';

export const styles = (theme: Theme) => ({
  balanceText: {
    ...theme.typography['subline-sm'],
    color: theme.palette.text.disabled,
    marginBottom: '4px',
  },
  balanceText2: {
    ...theme.typography['subline-sm'],
    color: theme.palette.text.disabled,
    marginTop: '12px',
    marginBottom: '4px',
  },
  earnText: {
    ...theme.typography['subline-sm'],
    color: theme.palette.text.disabled,
    marginTop: '12px',
    marginBottom: '4px',
  },
  compoundBox: {
    marginTop: '12px',
  },
  stakedInValue: {
    ...theme.typography['body-lg-med'],
    display: 'flex',
    alignItems: 'center',
  },
  stakedInValueText: {
    marginLeft: '8px',
  },
  orange: {
    color: theme.palette.background.vaults.boostOutline,
  },
  inputContainer: {
    paddingTop: '24px',
    '& .MuiPaper-root': {
      position: 'relative' as const,
      backgroundColor: 'rgba(255,255,255,0.5)',
      borderRadius: '8px',
      padding: 0,
      margin: 0,
      boxShadow: '0 1px 0 rgba(0,0,0,0.5)',
      '& .MuiInputBase-input': {
        ...theme.typography['h3'],
        height: 'auto',
        padding: `12px 8px 12px ${16 + 24 + 8}px`,
      },
    },
    '& .MuiButton-root': {
      ...theme.typography['subline-sm'],
      color: theme.palette.text.primary,
      backgroundColor: 'rgba(238,236,222,0.5)',
      boxShadow: '0 2px 2px rgba(0,0,0,0.5)',
      borderRadius: '4px',
      margin: 0,
      padding: '6px 12px',
      position: 'absolute' as const,
      top: '8px',
      right: '8px',
      minWidth: 0,
    },
    '& .MuiInputBase-root': {
      width: '100%',
    },
  },
  inputLogo: {
    position: 'absolute' as const,
    top: '12px',
    left: '12px',
  },
  outputLogo: {
    position: 'absolute' as const,
    top: '12px',
    right: '12px',
  },
  label: {
    ...theme.typography['subline-lg'],
  },
  labelCheckbox: {
    ...theme.typography['body-sm-med'],
  },
  checkbox: {
    color: '#7b7452',
  },
  averageLine: {
    height: '15px',
    width: '2px',
    backgroundColor: '#59A662',
    borderRadius: '2px',
    marginRight: theme.spacing(0.5),
  },
  btnSubmit: {
    color: '#f5f5ff',
    backgroundColor: theme.palette.primary.main,
    boxShadow: '0 2px 2px rgba(0,0,0,0.5)',
    padding: '12px 24px',
    borderRadius: '8px',
    '&:hover': {
      backgroundColor: '#389D44',
      boxShadow: '0 2px 2px rgba(0,0,0,0.5)',
    },
    '&.Mui-disabled': {
      backgroundColor: 'rgba(133, 191, 75, 0.5)',
      boxShadow: '0 2px 2px rgba(0,0,0,0.5)',
    },
    '& + $btnSubmit': {
      marginTop: '12px',
    },
  },
  btnContainer: {
    marginTop: 16,
  },
  depositTokenContainer: {
    width: 'calc(100% + 11px)',
    marginBottom: theme.spacing(1.5),
    '& .MuiTypography-root': {
      width: '100%',
    },
    '& .MuiIconButton-label': {
      padding: '0px 12px',
    },
    '& .MuiIconButton-root': {
      padding: 0,
    },
    '& .MuiButtonBase-root': {
      '& .MuiIconButton-label': {
        color: '#FFF',
      },
    },
    '& label:last-child': {
      marginBottom: 0,
    },
  },
  radioGroup: {
    '& $depositTokenContainer:last-child': {
      marginBottom: 0,
    },
  },
  assetCount: {
    color: theme.palette.text.primary,
  },
  zapPromotion: {
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1.5),
  },
  assetsDivider: {
    display: 'grid',
    columnGap: '16px',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  },
  width50: {
    width: '50%',
  },
  width100: {
    width: '100%',
  },
});
