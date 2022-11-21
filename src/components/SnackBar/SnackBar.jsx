import React from "react";

import { Alert, Snackbar } from "@mui/material";
import { makeStyles } from "./styles";

export const SnackBar = ({ text, name = "sender", open, handleClose }) => {
  const style = makeStyles();
  return (
    <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success" sx={style.alert}>
        {text} {name}!
      </Alert>
    </Snackbar>
  );
};
