// Import Mongose
const mongoose = require("mongoose");

// Allows us to use the mongoose Schema constructor
const Schema = mongoose.Schema;

//Create a new Schema obj
const ChatroomSchema = new Schema({
    // Title of the Chatroom
    title: String,
    // Description of the Chatroom
    description: String,
    // Location of the Chatroom
    location: String,
    // Messages in the Chatroom
    messages: [
        {
            // Type is the message id
            type: Schema.Types.ObjectId,
            // Reference the Message Id
            ref: "Message"
        }
    ]
})

// Create model with the Schema above
const Chatroom = mongoose.model("Chatroom", ChatroomSchema);

//Export Chatroom model
module.exports = Chatroom;