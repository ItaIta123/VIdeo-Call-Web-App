import React, { createContext, useState, useRef, useEffect } from "react";

import { io } from "socket.io-client";
import Peer from "simple-peer";

// creating a context for the Socket global state
const SocketContext = createContext();

// getting client socket side from the backend socket server
const socket = io("https://localhost:5001");

const ContextProvider = ({ children }) => {
  const [myId, setMyId] = useState("");
  const [name, setName] = useState("");
  const [stream, setStream] = useState(null);
  const [callData, setCallData] = useState({});
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);

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
  }, []);

  // answering a call handler
  const answerCall = () => {
    setCallAccepted(true);

    // setting up a Peer object (for webRTC usage)
    const peer = new Peer({ initiator: false, trickle: false, stream });

    // listening to a signal event from the other user
    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: callData.from });
    });

    // set the other user current stream
    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    // signaling (like "emit" for socket.io) 
    // peer.signal(data) - "Call this method whenever the remote peer emits a peer.on('signal') event."
    peer.signal(callData.signal);

    connectionRef.current = peer;
  };

  // initiating a call handler
  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    // listening to a signal event from the other user
    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: myId,
        name,
      });
    });

    // set the other user current stream
    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);

      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);

    // stop receiving input from user audion and video.
    connectionRef.current.destroy();

    // fixed a bug of not being able to call a user immediately after hagging up a call
    // this will re-populate the myId variable and fix the problem
    window.location.reload();
  };

  // export CONTEXT
  return (
    <SocketContext.Provider
      value={{
        callData,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        name,
        setName,
        callEnded,
        myId,
        callUser,
        leaveCall,
        answerCall,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};


export {ContextProvider, SocketContext}
