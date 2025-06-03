import { useState, createContext, useContext, useMemo, useEffect } from "react";

import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { deepPurple, grey } from "@mui/material/colors";

import { fetchVerify } from "./libs/fetcher";

import Template from "./Template";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Comments from "./pages/Comments";
import Likes from "./pages/Likes";

const AppContext = createContext();

export const queryClient = new QueryClient();

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

  useEffect(() => {
    fetchVerify().then((user) => {
      if (user) setAuth(user);
    });
  }, []);

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
          showDrawer,
          setShowDrawer,
          showForm,
          setShowForm,
          globalMsg,
          setGlobalMsg,
          auth,
          setAuth,
          mode,
          setMode,
        }}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
        <CssBaseline />
      </AppContext.Provider>
    </ThemeProvider>
  );
};

export default ThemedApp;
