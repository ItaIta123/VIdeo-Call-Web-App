import React, { useContext } from "react";
import { Button } from "@material-ui/core";

import { SocketContext } from "../SocketContext";

const Notifications = () => {
  const { answerCall, callData, callAccepted } = useContext(SocketContext);
  return (
    <>
      {callData.isReceivedCall && !callAccepted && (
        <div styles={{ display: "flex", justifyContent: "center" }}>
          <h1>{callData.name} is calling: </h1>
          <Button variant="contained" color="primary" onClick={answerCall}>
            Answer Call
          </Button>
        </div>
      )}
    </>
  );
};

export default Notifications;
