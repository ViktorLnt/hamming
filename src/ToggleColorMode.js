import React, {
    useState,
    createContext,
    useMemo,
  } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import App from './App';

const ColorModeContext = createContext({ toggleColorMode: () => {} });

export default function ToggleColorMode() {
  const [mode, setMode] = useState("dark");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <App ColorModeContext={ColorModeContext}/>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}