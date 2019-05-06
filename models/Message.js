// Import Mongose
const mongoose = require("mongoose");

// Allows us to use the mongoose Schema constructor
const Schema = mongoose.Schema;

//Create a new Schema obj
const MessageSchema = new Schema({
    // Message
    message: String,
    // Time is was create
    date: String,
    // Message owner
    name: String

})

// Create model with the Schema above
const Message = mongoose.model("Message", MessageSchema);

//Export Chatroom model
module.exports = Message;