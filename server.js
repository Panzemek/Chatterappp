const express = require("express");
const mongoose = require("mongoose");

// Initialize Express
const app = express();
var http = require("http").Server(app);
const io = require("socket.io")(http);
const PORT = process.env.PORT || 5000;

const ClientManager = require("./ClientManager");
const ChatroomManager = require("./ChatroomManager");
const makeHandlers = require("./handlers");

const clientManager = ClientManager();
const chatroomManager = ChatroomManager();

//Parse request body as a JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to the mongoDb
mongoose.connect("mongodb://localhost/chatterappdb", { useNewUrlParser: true });

io.on("connection", function(client) {
  const {
    handleRegister,
    handleJoin,
    handleLeave,
    handleMessage,
    handleGetChatrooms,
    handleDisconnect
  } = makeHandlers(client, clientManager, chatroomManager);

  console.log("client connected...", client.id);
  clientManager.addClient(client);

  client.on("register", handleRegister);

  client.on("join", handleJoin);

  client.on("leave", handleLeave);

  client.on("message", handleMessage);

  client.on("chatrooms", handleGetChatrooms);

  client.on("availableUsers", handleGetAvailableUsers);

  client.on("disconnect", function() {
    console.log("client disconnect...", client.id);
    handleDisconnect();
  });

  client.on("error", function(err) {
    console.log("received error from client:", client.id);
    console.log(err);
  });
});

//Start the server
http.listen(PORT, () => console.log(`App running on port ${PORT}!`));
