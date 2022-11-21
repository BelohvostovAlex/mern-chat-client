import React from "react";

import { LoginForm } from "../../components/LoginForm/LoginForm";
import { Box } from "@mui/material";

import { makeStyles } from "./styles";

export const Login = () => {
  const style = makeStyles();
  return (
    <Box sx={style.loginPage}>
      <LoginForm />
    </Box>
  );
};
