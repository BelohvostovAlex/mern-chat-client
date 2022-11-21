import React, { useState } from "react";
import { format } from "timeago.js";

import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { makeStyles } from "./styles";

export const MyMessage = ({ item, users }) => {
  const { sendTime, theme, text, sender } = item;
  const [expanded, setExpanded] = useState(false);

  const style = makeStyles();
  const msgSenderUsername = users.find((user) => user._id === sender);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box sx={style.messageWrapper}>
      <Box sx={style.messageHeader}>
        <Typography>Sender: {msgSenderUsername?.username}</Typography>
        <Typography>Time: {format(sendTime)}</Typography>
      </Box>
      <Box sx={style.messageInfo}>
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>Theme:</Typography>
            <Typography sx={{ color: "text.secondary" }}>{theme}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{text}</Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
};
