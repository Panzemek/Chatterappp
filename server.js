const express = require("express");
const mongoose = require("mongoose");

// Initialize Express
const app = express();
var http = require("http").Server(app);
const io = require("socket.io")(http);
const PORT = process.env.PORT || 5000;

//Parse request body as a JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to the mongoDb
mongoose.connect("mongodb://localhost/chatterappdb", { useNewUrlParser: true });

let clients = {};
let users = {};

io.on("connection", client => {
  console.log("client connected...", client.id);
  clients[client.id] = client;

  client.on("join", (userId, room) => onJoin(userId, room, client));

  client.on("leave", (userId, room) => onLeave(userId, room, client));

  client.on("message", (msg, room) => onMessageReceived(msg, room, client));

  client.on("disconnect", userId => onDisconnect(userId));

  client.on("error", function(err) {
    console.log("received error from client:", client.id);
    console.log(err);
  });
});

function onJoin(userId, room, client) {
  try {
    if (!userId) {
      // Todo: Code for unlogged user viewing local chat
      console.log("Not logged in.");
    } else {
      client.join(room);
      users[client.id] = userId;
      _sendExistingMessages(client, room);
    }
  } catch (err) {
    console.err(err);
  }
}

function onMessageReceived(msg, room, senderClient) {
  let userId = users[senderClient];

  if (!userId) {
    console.log("Listening without user ID");
    return;
  }

  _sendAndSaveMessage(msg, room, senderClient);
}

function _sendExistingMessages(room, client) {
  // Will need to modify database path to math our structure
  let messages = db
    .collection("messages")
    .find(room)
    .sort({ createdAt: 1 })
    .toArray((err, messages) => {
      if (!messages.length) return;
      client.to(room).emit("message", messages.reverse);
    });
}

function _sendAndSaveMessage(msg, room, client, fromServer) {
  let messageData = {
    text: msg.text,
    user: msg.user,
    createdAt: new Date(message.createdAt),
    chatName: room
  };

  // Will need to modify database path to math our structure
  db.collection("messages").insert(messageData, (err, msg, room) => {
    // If the message is from the server, then send to everyone.
    let emitter = fromServer ? io : socket.to(room);
    emitter.emit("message", [msg]);
  });
}

// Allow the server to participate in the chatroom through stdin.
var stdin = process.openStdin();
stdin.addListener('data', function(d) {
  _sendAndSaveMessage({
    text: d.toString().trim(),
    createdAt: new Date(),
    user: { _id: 'robot' }
  }, null /* no socket */, true /* send from server */);
});

//Start the server
http.listen(PORT, () => console.log(`App running on port ${PORT}!`));
