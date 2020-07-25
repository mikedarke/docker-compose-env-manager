import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline, createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#ff990a'
    },
    secondary: {
      main: '#489fb5'
    }
  }
});

type Props = {
  children: any;
};

const Theme = ({ children }: Props) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default Theme;
