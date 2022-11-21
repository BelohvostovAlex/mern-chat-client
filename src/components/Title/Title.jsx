import React from "react";

import { Typography } from "@mui/material";

import { makeStyles } from "./styles";

export const Title = ({ title, fontSize = "14px" }) => {
  const style = makeStyles({ fontSize });
  return <Typography sx={style.titleWrapper}>{title}</Typography>;
};
