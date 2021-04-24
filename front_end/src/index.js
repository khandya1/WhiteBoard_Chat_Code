import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
      primary: {
        light: '#00B4D8',
        main: '#00B4D8',
        dark: '#0077B6',
        contrastText: '#000',
      },
      secondary: {
        light: '#000A29',
        main: '#000A29',
        dark: '#002884',
        contrastText: '#fff',
      },
      info: {
        light: '#FFD500',
        main: '#FFD500',
        dark: '#ba000d',
        contrastText: '#fff',
      },
    },
    typography: {
      "fontFamily": `"Poppins", "Helvetica", "Arial", sans-serif`,
      button: {
        textTransform: 'none'
      }
     },
    overrides: {
      MuiOutlinedInput: {
          root: {
              position: 'relative',
              '& $notchedOutline': {
                  borderColor: '#FFD500',
              },
              '&:hover:not($disabled):not($focused):not($error) $notchedOutline': {
                  borderColor: '#FFD500',
                  // Reset on touch devices, it doesn't add specificity
                  '@media (hover: none)': {
                      borderColor: '#FFD500',
                  },
              },
              '&$focused $notchedOutline': {
                  borderColor: '#FFD500',
                  borderWidth: 1,
              },
          },
      },
      MuiFormLabel: {
          root: {
              '&$focused': {
                  color: '#4A90E2'
              }
          }
      }
    }
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App /> 
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
