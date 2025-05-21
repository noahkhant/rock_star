import { Alert, Box, Button, TextField, Typography } from "@mui/material";

import { useRef, useState } from "react";

import { useMutation } from "@tanstack/react-query";
import { postUser } from "../libs/fetcher";
import { useAsyncError, useNavigate } from "react-router-dom";
import { useApp } from "../ThemedApp";

const Register = () => {
  const { setGlobalMsg } = useApp();

  const nameInput = useRef();
  const usernameInput = useRef();
  const bioInput = useRef();
  const passwordInput = useRef();

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = () => {
    const name = nameInput.current.value;
    const username = usernameInput.current.value;
    const bio = bioInput.current.value;
    const password = passwordInput.current.value;

    if (!name || !username || !bio || !password) {
      setError("name, username and password required");
      return false;
    }

    create.mutate({ name, username, bio, password });
  };

  const create = useMutation(async (data) => {
    postUser(data),
      {
        onError: async () => {
          setError("Can't create user");
        },
        onSuccess: async () => {
          setGlobalMsg("Account created successfully");
          navigate("/login");
        },
      };
  });

  return (
    <Box>
      <Typography variant="h3">Register</Typography>
      {error && (
        <Alert severity="warning" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 2 }}>
          <TextField inputRef={name} placeholder="Name" fullWidth />
          <TextField inputRef={username} placeholder="Username" fullWidth />
          <TextField inputRef={bio} placeholder="Bio" fullWidth />
          <TextField inputRef={password} placeholder="Password" fullWidth />
        </Box>

        <Button variant="contained" type="contained" fullWidth>
          Register
        </Button>
      </form>
    </Box>
  );
};

export default Register;
