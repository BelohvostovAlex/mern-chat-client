import React, { useState } from "react";

import { Box, TextField } from "@mui/material";
import { Title } from "../Title/Title";
import { FormBtn } from "../FormBtn/FormBtn";
import { loginAuthService } from "../../services/authService";
import { useStateContext } from "../../context/StateContext";

import { makeStyles } from "./styles";

export const LoginForm = () => {
  const [username, setUsername] = useState("");
  const { addUser } = useStateContext();

  const style = makeStyles();

  const onSubmit = async (e) => {
    e.preventDefault();
    const candidate = await loginAuthService("/auth/login", { username });

    if (candidate) {
      sessionStorage.setItem("auth", true);
      sessionStorage.setItem("username", candidate.username);
    }
    addUser(candidate);
  };

  return (
    <Box sx={style.loginFormWrapper}>
      <Title title="Welcome, please log in" fontSize={"24px"} />
      <Box component="form" sx={style.loginForm} onSubmit={onSubmit}>
        <TextField
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          label="username"
          placeholder="Type ur username"
          sx={style.textField}
        />
        <FormBtn title="Log in" />
      </Box>
    </Box>
  );
};
