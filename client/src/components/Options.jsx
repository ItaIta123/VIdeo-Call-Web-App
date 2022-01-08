import React, { useContext, useState } from "react";
import {
  Button,
  TextField,
  Grid,
  Typography,
  Paper,
  Container,
} from "@material-ui/core";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Assignment, Phone, PhoneDisabled } from "@material-ui/icons";
import toast, { Toaster } from "react-hot-toast";

import { SocketContext } from "../SocketContext";
import { OptionsStyles } from "./styles";

const Options = ({ children }) => {
  const { myId, callAccepted, name, setName, callEnded, leaveCall, callUser } =
    useContext(SocketContext);
  const [idToCall, setIdToCall] = useState("");
  const classes = OptionsStyles();

  const copySuccessNotification = () =>
    toast.success("Copied successfully! now share it with your friend.", {
      duration: 4000,
    });

  const callingNotification = () => {
    toast.loading("Calling your friend...", {
      duration: 6000,
    });
  };

  return (
    <Container className={classes.container}>
      <Paper elevation={10} className={classes.paper}>
        <form className={classes.root} noValidate autoComplete="off">
          <Grid container className={classes.gridContainer}>
            <Grid item xs={12} md={6} className={classes.padding}>
              <Typography gutterBottom variant="h6">
                Account Info
              </Typography>
              <TextField
                label="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
              />
              <CopyToClipboard text={myId} className={classes.margin}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  startIcon={<Assignment fontSize="large" />}
                  onClick={() => copySuccessNotification()}
                >
                  Copy Your ID
                </Button>
              </CopyToClipboard>
            </Grid>

            <Grid item xs={12} md={6} className={classes.padding}>
              <Typography gutterBottom variant="h6">
                Make a call
              </Typography>
              <TextField
                label="ID to call"
                value={idToCall}
                onChange={(e) => setIdToCall(e.target.value)}
                fullWidth
              />
              {callAccepted && !callEnded ? (
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<PhoneDisabled fontSize="large" />}
                  fullWidth
                  onClick={leaveCall}
                  className={classes.margin}
                >
                  Hang Up
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<Phone fontSize="large" />}
                  fullWidth
                  onClick={() => (callUser(idToCall), callingNotification())} // fire the callUSer function only when clicking the button
                  className={classes.margin}
                >
                  Call
                </Button>
              )}
            </Grid>
          </Grid>
        </form>
        {children}
      </Paper>
      <Toaster
        toastOptions={{
          loading: {
            style: {
              background: "#3f51b5",
              fontSize: "large",
              color: "white",
            },
          },
          success: {
            style: {
              background: "#8DEF7F",
              fontSize: "large",
            },
          },
        }}
      />
    </Container>
  );
};

export default Options;
