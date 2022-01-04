// server file

const app = require("express")();
const server = require("http").createServer(app);

const io = require("socket.io")(server, {
  cors: "*",
  methods: ["GET", "POST"], // enable only get and post from different origin
});

// socket
io.on("connection", (socket) => {
  // send user id to client
  socket.emit("myId", socket.id);

  socket.on("disconnect", () => {
    // broadcast - send events to all the connected clients.
    socket.broadcast.emit("callEnded");
  });

  // receiving an call user event from client (when pressing call)
  socket.on("callUser", ({ userToCall, signalData, from, name }) => {
    // emitting an event specifically to the target user to initiate a call from client side
    io.to(userToCall).emit("callUser", { signal: signalData, from, name });
  });

  socket.on("answerCall", (data) => {
      io.to(data.to).emit("callAccepted", data.signal)
  })
});

// server
const PORT = process.env.PORT || 5001;

app.get("/", (req, res) => {
  res.send("Server is up and running!");
});

server.listen(PORT, (err, res) => {
  console.log(`Listening on PORT ${PORT}`);
});
