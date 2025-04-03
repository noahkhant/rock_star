import { useState, createContext, useContext, useMemo } from "react";

import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

import { deepPurple, grey } from "@mui/material/colors";

import Template from "./Template";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Comments from "./pages/Comments";
import Likes from "./pages/Likes";

const AppContext = createContext();

export const useApp = () => {
  return useContext(AppContext);
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Template />,
    children: [
      {
        path: "/",
        element: <Home />,
      }, 
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/profile/:id",
        element: <Profile />,
      },
      {
        path: "/comments/:id",
        element: <Comments />,
      },
      {
        path: "/likes/:id",
        element: <Likes />,
      },
    ],
  },
]);

const ThemedApp = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [globalMsg, setGlobalMsg] = useState(null);
  const [auth, setAuth] = useState(null);
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
      <AppContext.Provider 
        value={{ 
          showDrawer, setShowDrawer,
          showForm, setShowForm, 
          globalMsg, setGlobalMsg,
          auth, setAuth,
          mode, setMode }}>
        
        <RouterProvider router={router} />
        <CssBaseline />
      </AppContext.Provider>
    </ThemeProvider>
  );
};

export default ThemedApp;
