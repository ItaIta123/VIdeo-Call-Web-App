import { makeStyles } from "@material-ui/core/styles";

// styles like in React Native
const AppStyles = makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: "5px 100px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "600px",
    border: "2px solid black",

    [theme.breakpoints.down("xs")]: {
      width: "90%",
    },
  },
  image: {
    marginLeft: "15px",
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
}));

const VideoPlayerStyles = makeStyles((theme) => ({
  video: {
    width: '550px',
    [theme.breakpoints.down('xs')]: {
      width: '300px',
    },
  },
  gridContainer: {
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },

  grid: {
    display :"flex",
    alignItems: "center",
    flexDirection: 'column',
  
  },
  paper: {
    padding: '10px',
    border: '2px solid black',
    margin: '3px',
  },
}));

const OptionsStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'center'
  },
  gridContainer: {
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  container: {
    width: '590px',
    margin: '35px',
    padding: 0,
    [theme.breakpoints.down('xs')]: {
      width: '80%',
    },
  },
  margin: {
    marginTop: 15,
  },
  padding: {
    padding: 10,
  },
  paper: {
    padding: '10px 20px',
    border: '2px solid black',
    display: 'flex',
    flexDirection : 'row'
  },
 }));



export {AppStyles, VideoPlayerStyles, OptionsStyles};
