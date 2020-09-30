import { createMuiTheme } from '@material-ui/core/styles';

const arcBlue = '#0B72B9';
const arcOrange = '#FFBA60';

export default createMuiTheme({
  palette: {
    common: {
      blue: arcBlue,
      orange: arcOrange,
    },
    primary: {
      main: arcBlue,
    },
    secondary: {
      main: arcOrange,
    },
  },
  typography: {
    tab: {
      fontSize: '1rem',
      fontFamily: 'Raleway',
      fontWeight: 700,
      textTransform: 'none',
    },
    estimate: {
      fontFamily: 'pacifico',
      textTransform: 'none',
      color: 'white',
      fontSize: '1rem',
    },
  },
});
