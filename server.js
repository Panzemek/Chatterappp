const express = require("express");
const mongoose = require("mongoose");

// Initialize Express
const app = express();
var http = require("http").Server(app);
const io = require("socket.io")(http);
const PORT = process.env.PORT || 5000;

const ChatroomManager = require("./ChatroomManager");
const chatroomManager = ChatroomManager();

const Chatroom = require('./Chatroom')



//Parse request body as a JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to the mongoDb
mongoose.connect("mongodb://localhost/chatterappdb", { useNewUrlParser: true });

const members = new Map();
let chatHistory = [];

io.on("connection", function(client) {
  console.log("client connected...", client.id);

  client.on("join", room => {
    client.join(room);
    // Add user to room user list
  });

  client.on("leave", room => {
    /// Remove user from rooms user list
  });

  client.on("message", (msg, room) => {
    /// msg object needs to contain everything we post in the chat
    /// Needs to add to database
    io.to(room).emit("client messge", msg)
  });

  client.on("disconnect", function() {
    /// need functionality to remove from current users list in any current rooms
    console.log("client disconnect...", client.id);
 
  });

  client.on("error", function(err) {
    console.log("received error from client:", client.id);
    console.log(err);
  });
});

//Start the server
http.listen(PORT, () => console.log(`App running on port ${PORT}!`));
