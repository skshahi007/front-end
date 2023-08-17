import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline, useMediaQuery } from "@mui/material";
import { createContext, useMemo, useState } from "react";

import { BrowserRouter } from "react-router-dom";
import './App.css';
import Router from "./routes";

export const ColorModeContext = createContext({ toggleColorMode: () => { } });

function App() {

  
  var prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  var initValue='light'
  if( prefersDarkMode ){
    initValue='dark';
  }
  const [mode, setMode] = useState(initValue);
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
