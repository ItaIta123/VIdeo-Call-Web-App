import React, { useContext, useState } from "react";
import { Grid, Typography, Paper, Button } from "@material-ui/core";
import { Mic, MicOff } from "@material-ui/icons";


import { VideoPlayerStyles } from "./styles";

import { SocketContext } from "../SocketContext";

const VideoPlayer = () => {
  const {
    name,
    callAccepted,
    myVideo,
    userVideo,
    callEnded,
    stream,
    callData,
  } = useContext(SocketContext);
  const classes = VideoPlayerStyles();

  const [micOn, setMicON] = useState(false);

  const unmute = (videoRef) => {
    videoRef.current.muted = false;
    setMicON(true)

  };

  const mute = (videoRef) => {
    videoRef.current.muted = true;
    setMicON(false)
  };


  
  return (
    <Grid container className={classes.gridContainer}>
      {/* Own Video show only if there is a stream*/}
      {stream && (
        <Paper className={classes.paper}>
          <Grid className={classes.grid}>
            <Typography variant="h5" gutterBottom>
              {name || "Name"}
            </Typography>
            <video
              playsInline
              muted
              ref={myVideo}
              autoPlay
              className={classes.video}
            />
            {micOn === true ? (
              <Button
              style={{marginTop: 7}}

                variant="contained"
                color="secondary"
                startIcon={<Mic fontSize="large" />}
                onClick={() => mute(myVideo)}
              >
                Mute
              </Button>
            ) : (
              <Button
                style={{marginTop: 7}}
                variant="contained"
                color="secondary"
                startIcon={<MicOff fontSize="large" />}
                onClick={() => unmute(myVideo)}
              >
                UnMute
              </Button>
            )}
          </Grid>
        </Paper>
      )}

      {/* Other User Video show only if user accepted the call and it did not end */}

      {callAccepted && !callEnded && (
        <Paper className={classes.paper}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              {callData.name || "Name"}
            </Typography>
            <video
              playsInline
              ref={userVideo}
              autoPlay
              className={classes.video}
            />
          </Grid>
        </Paper>
      )}
    </Grid>
  );
};

export default VideoPlayer;
