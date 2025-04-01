import { useState, createContext, useContext, useMemo } from "react";

import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

import App from "./App";
import { deepPurple, grey } from "@mui/material/colors";

const AppContext = createContext();

export const useApp = () => {
  return useContext(AppContext);
};

const ThemedApp = () => {
  const [showForm, setShowForm] = useState(false);
  const [mode, setMode] = useState("dark");

  const theme = useMemo(() => {
    return createTheme({
      palette: {
        mode,
        primary: deepPurple,
        banner: mode === "dark" ? grey[800] : grey[200],
        text: {
          fade: grey[500],
        },
      },
    });
  }, [mode]);

  return (
    <ThemeProvider theme={theme}>
      <AppContext.Provider value={{ showForm, setShowForm, mode, setMode }}>
        <App />
        <CssBaseline />
      </AppContext.Provider>
    </ThemeProvider>
  );
};

export default ThemedApp;
