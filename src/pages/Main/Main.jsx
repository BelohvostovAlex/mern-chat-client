import React from "react";

import { Box, Button, Typography } from "@mui/material";

import { useStateContext } from "../../context/StateContext";
import { MessageForm } from "../../components/MessageForm/MessageForm";

import { makeStyles } from "./styles";

export const Main = () => {
  const { user, handleAuth } = useStateContext();

  const style = makeStyles();

  const username = user?.username || localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("username");
    handleAuth();
  };

  return (
    <Box sx={style.mainWrapper}>
      <Box sx={style.mainHeader}>
        <Typography sx={style.mainTitle}>Hello {username}!</Typography>
        <Button onClick={handleLogout} variant="contained" sx={style.mainBtn}>
          Log out
        </Button>
      </Box>
      <Box sx={style.mainContent}>
        <MessageForm user={user} />
      </Box>
    </Box>
  );
};
