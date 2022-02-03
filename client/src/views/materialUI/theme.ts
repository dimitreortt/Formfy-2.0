import { createTheme } from '@mui/material';
// import { createTheme } from '@mui/system';
import { alpha } from '@mui/material/styles';

const PRIMARY = '#21336E';

export const theme = createTheme({
  palette: {
    // background: {
    //   paper: '#fff',
    // },
    // text: {
    //   primary: '#173A5E',
    //   secondary: '#46505A',
    // },
    // action: {
    //   active: '#001E3C',
    // },
    // success: {
    //   dark: '#009688',
    // },
    primary: {
      main: PRIMARY,
      light: alpha(PRIMARY, 0.5),
    },
  },
});
