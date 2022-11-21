import React from "react";

import { Button } from "@mui/material";

import { makeStyles } from "./styles";

export const FormBtn = ({ title = "Send", styles }) => {
  const style = makeStyles({ ...styles });
  return (
    <Button type="submit" sx={style.btn} variant="contained">
      {title}
    </Button>
  );
};
