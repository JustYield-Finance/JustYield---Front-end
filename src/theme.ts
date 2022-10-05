import { createTheme } from '@material-ui/core/styles';
import { TypographyStyleOptions } from '@material-ui/core/styles/createTypography';

const fontStack = [
  '"DM Sans"',
  'system-ui',
  '-apple-system',
  '"Segoe UI"',
  'Roboto',
  '"Helvetica Neue"',
  'Arial',
  '"Noto Sans"',
  '"Liberation Sans"',
  'sans-serif',
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"',
  '"Noto Color Emoji"',
].join(',');

const fontStyles: Record<string, TypographyStyleOptions> = {
  h1: {
    fontSize: '32px',
    lineHeight: '40px',
    fontWeight: 500,
  },
  h2: {
    fontSize: '24px',
    lineHeight: '32px',
    fontWeight: 500,
  },
  h3: {
    fontSize: '21px',
    lineHeight: '24px',
    fontWeight: 500,
  },
  'body-lg': {
    fontFamily: fontStack,
    fontSize: '16px',
    lineHeight: '24px',
    textTransform: 'none' as const,
    fontWeight: 400,
  },
  'body-lg-med': {
    fontFamily: fontStack,
    fontSize: '16px',
    lineHeight: '24px',
    textTransform: 'none' as const,
    fontWeight: 500,
  },
  'body-sm': {
    fontFamily: fontStack,
    fontSize: '12px',
    lineHeight: '20px',
    textTransform: 'none' as const,
    fontWeight: 400,
  },
  'body-sm-med': {
    fontFamily: fontStack,
    fontSize: '12px',
    lineHeight: '20px',
    textTransform: 'none' as const,
    fontWeight: 500,
  },
  'subline-lg': {
    fontFamily: fontStack,
    fontSize: '15px',
    lineHeight: '24px',
    fontWeight: 500,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
  },
  'subline-sm': {
    fontFamily: fontStack,
    fontSize: '12px',
    lineHeight: '20px',
    fontWeight: 500,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
  },
};

const theme = createTheme({
  /*palette: {
    type: 'dark',
    primary: { main: '#59A662', light: '#CDF7D2', dark: '#004708' },
    background: {
      default: '#232743',
      paper: '#232743',
      light: '#313759',
      content: '#2D3153',
      contentLight: '#F4F4F4',
      header: '#121212',
      footer: '#121212',
      cta: '#59A662',
      appBG: '#1B1E31',
      filters: {
        active: '#4C5480',
        inactive: '#262A40',
        outline: '#303550',
        footer: '#191C29',
      },
      vaults: {
        default: '#2D3153',
        defaultOutline: '#363B63',
        boostOutline: '#DB8332',
        gov: '#342763',
        govOutline: '#42477B',
        inactive: '#111321',
        inactiveOutline: '#762C2C',
      },
      snackbars: {
        bg: '#FFF',
        bgLine: '#E5E5E5',
        bgBtn: '#363B63',
        text: '#2D3153',
        error: '#DC2C10',
      },
    },
    text: {
      primary: '#F5F5FF',
      secondary: '#D0D0DA',
      disabled: '#999CB3',
    },
  },*/
  palette: {
    type: 'dark',
    primary: { main: '#85bf4b', light: '#32082d', dark: '#ffb8f7' },
    background: {
      default: '#dcd8bc',
      paper: '#dcd8bc',
      light: '#cec8a6',
      content: '#d2ceac',
      contentLight: '#0b0b0b',
      header: '#ededed',
      footer: '#ededed',
      cta: '#85bf4b',
      appBG: '#e4e1ce',
      filters: {
        active: '#b3ab7f',
        inactive: '#d9d5bf',
        outline: '#cfcaaf',
        footer: '#e6e3d6',
      },
      vaults: {
        default: '#d2ceac',
        defaultOutline: '#c9c49c',
        boostOutline: '#247ccd',
        gov: '#cbd89c',
        govOutline: '#bdb884',
        inactive: '#eeecde',
        inactiveOutline: '#89d3d3',
      },
      snackbars: {
        bg: '#000000',
        bgLine: '#1a1a1a',
        bgBtn: '#c9c49c',
        text: '#d2ceac',
        error: '#23d3ef',
      },
    },
    text: {
      primary: '#0a0a00',
      secondary: '#2f2f25',
      disabled: '#66634c',
    },
  },
  typography: {
    fontFamily: fontStack,
    h1: fontStyles['h1'],
    h2: fontStyles['h2'],
    h3: fontStyles['h3'],
    button: fontStyles['body-lg-med'],
    body1: fontStyles['body-lg'],
    body2: fontStyles['body-lg'],
    'body-lg': fontStyles['body-lg'],
    'body-lg-med': fontStyles['body-lg-med'],
    'body-sm': fontStyles['body-sm'],
    'body-sm-med': fontStyles['body-sm-med'],
    'subline-lg': fontStyles['subline-lg'],
    'subline-sm': fontStyles['subline-sm'],
    h4: {
      color: 'red', // DO NOT USE
    },
    h5: {
      color: 'red', // DO NOT USE
    },
    h6: {
      color: 'red', // DO NOT USE
    },
    caption: {
      color: 'red', // DO NOT USE
    },
    subtitle1: {
      color: 'red', // DO NOT USE
    },
    subtitle2: {
      color: 'red', // DO NOT USE
    },
    overline: {
      color: 'red', // DO NOT USE
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1296,
      xl: 1920,
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        ':root': {
          '--onboard-font-family-normal': 'DM Sans',
          '--onboard-font-family-semibold': 'DM Sans',
          '--onboard-font-family-light': 'DM Sans',
          '--onboard-modal-z-index': '1',
          '--onboard-modal-backdrop': 'rgba(0,0,0,0.2)',
          '--onboard-modal-border-radius': '20px',
          '--onboard-wallet-button-border-radius': '8px',
          '--onboard-connect-header-background': '#eeecde',
          '--onboard-connect-header-color': '#0a0a00',
          '--onboard-modal-color': '#0a0a00',
          '--onboard-modal-background': '#dcd8bc',
          '--onboard-main-scroll-container-background': '#dcd8bc',
          '--onboard-close-button-background': '#eeecde',
          '--onboard-close-button-color': '#757157',
          '--onboard-wallet-button-border-color': '#d2ceac',
          '--onboard-wallet-button-background': '#d2ceac',
          '--onboard-wallet-button-color': '#2f2f25',
          '--onboard-wallet-button-background-hover': 'rgba(10, 10, 10, 0.08)',
          '--onboard-wallet-button-color-hover': '#fff',
          '--onboard-wallet-app-icon-border-color': '#ff',
          '--onboard-wallet-app-icon-background-transparent': '#fff',
          '--onboard-connect-sidebar-background': '#ededed',
          '--onboard-connect-sidebar-color': '#0a0a00',
        },
      },
    },
    MuiInputBase: {
      input: fontStyles['body-lg-med'],
    },
    MuiBackdrop: {
      root: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        backdropFilter: 'blur(8px)',
      },
    },
  },
});

export { theme };
