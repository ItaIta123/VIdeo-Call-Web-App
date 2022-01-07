import React from "react";
import { Typography, AppBar } from "@material-ui/core";

import {AppStyles} from "./components/styles.jsx";
import VideoPlayer from "./components/VideoPlayer.jsx";
import Options from "./components/Options.jsx";
import Notifications from "./components/Notifications.jsx";

const App = () => {
  const classes = AppStyles();
  return (
    <div className={classes.wrapper}>
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography variant="h5" align="center">
          My Video Chat Web App
        </Typography>
      </AppBar>
      <VideoPlayer />
      <div style={{width: 627}}>
      <Options>
        <Notifications />
        </Options>
        </div>
    </div>
  );
};

export default App;
