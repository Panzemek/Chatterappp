const express = require("express");
const mongoose = require("mongoose");
const db = require("./models");
const bcrypt = require("bcrypt");

// Initialize Express 
const app = express();

const PORT = process.env.PORT || 5000;

//Parse request body as a JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to the mongoDb
mongoose.connect("mongodb://localhost/chatterappdb", { useNewUrlParser: true });

//Start the server
app.listen(PORT, () => console.log(`App running on port ${PORT}!`));


// //Dummy data
// const tempData = {
//     userName: "TomJ",
//     firstName: "Tom",
//     lastName: "Jones",
//     password: "passTom",
//     homeLocation: "41^24'12.2N2^10'26.5E",
//     currentLocation: "41^24'32.6N2^15'12.3E",
// }

// //Dummy Note
// const tempMessage = {
//     message: "Hello",
//     data: "101023041005",
//     name: "Tom"
// }

//Dummy Chatroom
// const tempRoom = {
//     title: "MTG RULES",
//     description: "This is a great group with great people, playing a great game of magic",
//     location: "41^24'12.2N2^10'26.5E"
// }

//Id for MTG RULES 
// 5ccc8061e8d46d44908c7001


// //Testing bcrypt
// const saltRounds = 10;

// // Routes
// bcrypt.hash(tempData.password, saltRounds, (err, hash) => {

//     db.User.create({
//         userName: tempData.userName,
//         firstName: tempData.firstName,
//         lastName: tempData.lastName,
//         password: hash,
//         homeLocation: tempData.homeLocation,
//         currentLocation: tempData.currentLocation
//     }).then((dbUser) => console.log(dbUser))
//         .catch((err) => {
//             if (err) throw err;
//         });
// });

// db.Chatroom.create({
//     title: "MTG RULES",
//     description: "This is a great group with great people, playing a great game of magic",
//     location: "41^24'12.2N2^10'26.5E"
// })
//     .then((dbChatroom) => console.log(dbChatroom))
//     .catch((err) => {
//         if (err) throw err;
//     });

// app.post("/message/:id")
// db.Message.create(tempMessage)
//     .then((dbMessage) => {
//         console.log(dbMessage)
//         // We will parse in the chatroom id, when making the post request
//         return db.Chatroom.findOne({ _id: "5ccc8061e8d46d44908c7001" }).populate(dbMessage._id), { new: true }
//     })
//     .catch((err) => {
//         if (err) throw err;
//     });



