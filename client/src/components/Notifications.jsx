import React, { useContext } from "react";
import { Button } from "@material-ui/core";
import toast, { Toaster } from "react-hot-toast";
import {
  TextField,
  Grid,
  Typography,
  Paper,
  Container,
} from "@material-ui/core";


import { OptionsStyles } from "./styles";
import { SocketContext } from "../SocketContext";


const Notifications = () => {
  const classes = OptionsStyles();
  const { answerCall, callData, callAccepted } = useContext(SocketContext);
  return (
    <>
      {callData.isReceivedCall ? copySuccessNotification(callData) : null}
      {callData.isReceivedCall && !callAccepted && (
        <Grid>
        <Typography gutterBottom variant="h6">
        {callData.name} is calling: 
        </Typography>
          <Button variant="contained" color="secondary" onClick={answerCall}>
            Answer Call
          </Button>
          <Toaster />
        </Grid >
      )}
    </>
  );
};


const copySuccessNotification = (data) =>
  toast(`Receiving a call from: ${data.name} ☎️`, {
    duration: 4000,
    position: "top-center",
    // Styling
    style: { background: "#F37866", fontSize: "24px" },
    className: "",
    // Custom Icon
    icon: "☎️",
    // Change colors of success/error/loading icon
    iconTheme: {
      primary: "#000",
      secondary: "#fff",
    },
  });

export default Notifications;
