import React, { useContext } from "react";
import { Grid, Typography, Paper } from "@material-ui/core";
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
  return (
    <Grid container className={classes.gridContainer}>

      {/* Own Video show only if there is a stream*/}
      {stream && (
        <Paper className={classes.paper}>
          <Grid item xs={12} md={6}>
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
              autoplay
              className={classes.video}
            />
          </Grid>
        </Paper>
      )}
    </Grid>
  );
};

export default VideoPlayer;
