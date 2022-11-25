import React, { useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";

import { Box, Autocomplete, TextField } from "@mui/material";
import { Title } from "../Title/Title";
import { MyMessage } from "../MyMessage/MyMessage";
import { SnackBar } from "../SnackBar/SnackBar";

import {
  getMessagesMessageService,
  createMessageMessageService,
} from "../../services/messageService";
import { createDialoguesService } from "../../services/dialogueService";
import { getUsersAuthService } from "../../services/authService";
import { useGetDialogues } from "../../hooks/useGetDialogues";
import { useInput } from "../../hooks/useInput";

import { makeStyles } from "./styles";
import { FormBtn } from "../FormBtn/FormBtn";

export const MessageForm = ({ user }) => {
  const socket = useRef();

  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const [senderName, setSenderName] = useState("");
  const [recepient, setRecepient] = useState(null);
  const [theme, handleTheme, clearTheme] = useInput();
  const [text, handleText, clearText] = useInput();

  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [currDialogue, setCurrDialogue] = useState({});
  const { dialogues } = useGetDialogues([currDialogue, arrivalMessage]);

  const style = makeStyles();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const fetchUsers = async () => {
    const users = await getUsersAuthService("/auth/users");
    setUsers(users);
  };

  useEffect(() => {
    socket.current = io(process.env.REACT_APP_WS_PROTOCOL);

    fetchUsers();

    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        dialogueId: data.dialogueId,
        sender: data.sender,
        theme: data.theme,
        text: data.text,
        sendTime: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(users);
    });
    fetchUsers();
  }, [onlineUsers]);

  useEffect(() => {
    if (
      arrivalMessage &&
      arrivalMessage.sender !== user._id &&
      currDialogue?.members?.includes(arrivalMessage?.sender)
    ) {
      setMessages((prev) => [...prev, arrivalMessage]);
    }
    if (arrivalMessage) {
      setOpen(true);
      const user = users.find((user) => user._id === arrivalMessage.sender);
      setSenderName(user?.username);
    }
  }, [arrivalMessage]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
  }, [user]);

  useEffect(() => {
    const fetchMessages = async () => {
      const data = await getMessagesMessageService(
        `/messages/${currDialogue?._id}`
      );
      setMessages(data);
    };

    fetchMessages();
  }, [currDialogue]);

  const getCurrDialogue = async (recepient) => {
    setRecepient(recepient);
    const dialogue = dialogues.find(
      (item) =>
        item.members.includes(recepient._id) && item.members.includes(user._id)
    );

    if (!dialogue) {
      const newDialogue = await createDialoguesService("/dialogue/create", {
        senderId: user._id,
        recieverId: recepient?._id,
      });
      setCurrDialogue(newDialogue);
    } else {
      setCurrDialogue(dialogue);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const message = {
        dialogueId: currDialogue._id,
        sender: user?._id,
        theme,
        text,
      };
      socket.current.emit("sendMessage", {
        ...message,
        recieverId: recepient._id,
      });
      const newMessage = await createMessageMessageService(
        "/messages/new",
        message
      );

      clearTheme();
      clearText();

      setMessages((prev) => [...prev, newMessage]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box sx={style.messageFormWrapper} component="form" onSubmit={onSubmit}>
        <Title title="Send a new message" fontSize="18px" />
        <Autocomplete
          sx={style.textField}
          disablePortal
          options={users}
          getOptionLabel={(option) => option.username}
          isOptionEqualToValue={(option, value) =>
            option.username === value.username
          }
          value={recepient}
          onChange={(event, newValue) => {
            getCurrDialogue(newValue);
          }}
          renderInput={(params) => (
            <TextField {...params} label="Recipient" variant="filled" />
          )}
        />
        <TextField
          label="Theme"
          variant="filled"
          sx={style.textField}
          value={theme}
          onChange={handleTheme}
        />
        <TextField
          variant="filled"
          label="Message"
          multiline
          rows={4}
          placeholder="Type ur message..."
          sx={style.textField}
          value={text}
          onChange={handleText}
        />
        <FormBtn styles={style.messageFormButton} />
      </Box>
      {messages.length > 0 ? (
        <>
          <Title title="All messages for this dialogue:" />
          {messages.map((item) => (
            <MyMessage item={item} key={item._id} users={users} />
          ))}
        </>
      ) : (
        <Title title="There are no any messages.. Start a dialogue" />
      )}
      <SnackBar
        handleClose={handleClose}
        open={open}
        name={senderName}
        text="You have a new message from"
      />
    </>
  );
};
