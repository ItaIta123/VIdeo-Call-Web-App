import React from "react";
import { Typography, AppBar } from "@material-ui/core";

import useStyles from "./components/styles.jsx";
import VideoPlayer from "./components/VideoPlayer.jsx";
import Options from "./components/Options.jsx";
import Notifications from "./components/Notifications.jsx";

const App = () => {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography variant="h2" align="center">
          Video Chat
        </Typography>
      </AppBar>
      Video Chat App
      <VideoPlayer />
      <Options>
        <Notifications />
      </Options>
    </div>
  );
};

export default App;
