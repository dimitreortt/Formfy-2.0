import { createTheme } from '@mui/material';
import { alpha } from '@mui/material/styles';

const PRIMARY = '#21336E';

export const theme = createTheme({
  palette: {
    primary: {
      main: PRIMARY,
      light: alpha(PRIMARY, 0.5),
    },
  },
});
