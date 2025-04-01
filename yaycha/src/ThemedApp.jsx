import { useState, createContext } from "react";

import App from "./App";

export const AppContext = createContext();

const ThemedApp = () => {
    const [mode, setMode] = useState("dark")
    return(
        <AppContext.Provider value={{ mode, setMode}}>
            <App />
        </AppContext.Provider>
    );
};

export default ThemedApp;