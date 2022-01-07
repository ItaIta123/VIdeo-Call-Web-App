import React, { useContext } from "react";
import { Button } from "@material-ui/core";
import toast, { Toaster } from "react-hot-toast";

import { SocketContext } from "../SocketContext";


const Notifications = () => {
  const { answerCall, callData, callAccepted } = useContext(SocketContext);
  return (
    <>
      {callData.isReceivedCall ? copySuccessNotification(callData) : null}
      {callData.isReceivedCall && !callAccepted && (
        <div styles={{ display: "flex", justifyContent: "center" }}>
          <h1>{callData.name} is calling: </h1>
          <Button variant="contained" color="primary" onClick={answerCall}>
            Answer Call
          </Button>
          <Toaster />
        </div>
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
