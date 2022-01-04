import React, { createContext, useState, useRef, useEffect } from "react";

import { io } from "socket.io-client";
import Peer from "simple-peer";

// creating a context for the Socket global state
const SocketContext = createContext();

// getting client socket side from the backend socket server
const socket = io("https://localhost:5001");

const ContextProvider = ({ children }) => {
  const [myId, setMyId] = useState("");
  const [stream, setStream] = useState(null);
  const [callData, setCallData] = userState({});
  const [callAccepted, setCallAccepted] = userState(false);
  const [callEnded, setCallEnded] = userState(false);

  // current user video stream
  const myVideo = useRef();

  // other user video stream
  const userVideo = useRef();

  // current connection Peer object
  const connectionRef = useRef();

  useEffect(() => {
    // requesting camera and audio usage from user web browser
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);

        myVideo.current.srcObject = currentStream;
      });

    socket.on("myId", (id) => {
      setMyId(id);
    });

    socket.on("callUser", ({ from, name: callerName, signal }) => {
      setCallData({ isReceivedCall: true, from, name: callerName, signal });
    });

    console.log(call)
  }, []);


  // receiving a call handler
  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    // listening to a signal event from the other user
    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: call.from });
    });

    // set the other user current stream
    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    // signaling (like "emit" for socket.io) to call another user
    peer.signal(call.signal)


    connectionRef.current = peer;
  };

  // initiating a call handler
  const callUser = () => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

  };

  const leaveCall = () => {};
};
