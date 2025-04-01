import { useState, createContext, useContext } from "react";

import {
    CssBaseline,
    ThemeProvider,
    createTheme,
} from "@mui/material";

import App from "./App";

const theme = createTheme({
    palette: {
        mode: "dark",
    },
});

const AppContext = createContext();

export const useApp = () => {
    return useContext(AppContext);
}

const ThemedApp = () => {
    const [showForm, setShowForm] = useState(false)
    return(
        <ThemeProvider theme={theme}>
            <AppContext.Provider value={{ showForm, setShowForm}}>
                <App />
                <CssBaseline />
            </AppContext.Provider>
        </ThemeProvider>
    );
};

export default ThemedApp;