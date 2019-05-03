// Import database collections form the models folder
const db = require("../models");
// Import bcrypt to hash our passwords
const bcrypt = require("bcrypt");

// module.exports = function (app) {
    // //Dummy data
    const tempData = {
        userName: "TomJ",
        firstName: "Tom",
        lastName: "Jones",
        password: "passTom",
        homeLocation: "41^24'12.2N2^10'26.5E",
        currentLocation: "41^24'32.6N2^15'12.3E",
    }

    // //Dummy Note
    const tempMessage = {
        message: "Pokemons",
        data: "101023041005",
        name: "Tom"
    }

    //Dummy Chatroom
    const tempRoom = {
        title: "MTG RULES",
        description: "This is a great group with great people, playing a great game of magic",
        location: "41^24'12.2N2^10'26.5E"
    }

    //Id for MTG RULES chatroom
    // 5ccc8061e8d46d44908c7001

    //Id for POkemon chatroom
    // 5ccc926ff753833720479e89


    // //Testing bcrypt
    const saltRounds = 10;

    // Routes
    bcrypt.hash(tempData.password, saltRounds, (err, hash) => {

        db.User.create({
            userName: tempData.userName,
            firstName: tempData.firstName,
            lastName: tempData.lastName,
            password: hash,
            homeLocation: tempData.homeLocation,
            currentLocation: tempData.currentLocation
        }).then((dbUser) => console.log(dbUser))
            .catch((err) => {
                if (err) throw err;
            });
    });

    db.Chatroom.create({
        title: "Pokemon RULES",
        description: "This is a great Pokemon",
        location: "41^24'12.2N2^10'26.5E"
    })
        .then((dbChatroom) => console.log(dbChatroom))
        .catch((err) => {
            if (err) throw err;
        });

    app.post("/message/:id")
    db.Message.create(tempMessage)
        .then(function (dbMessage) {
            console.log(dbMessage)
            // We will parse in the chatroom id, when making the post request
            return db.Chatroom.findOneAndUpdate({ _id: "5ccc926ff753833720479e89" }, { $push: { messages: dbMessage } })
        }).then(function (test) {
            console.log(test)
        })
        .catch((err) => { 
            if (err) console.log(err);
        });

    // Route for grapping room and populating it with the messages
    db.Chatroom.findOne({ _id: "5ccc8061e8d46d44908c7001" })
        .populate("messages")
        .then(function (data) {
            console.log(data);
        }).catch(function (err) {
            console.log(err);
        })
// }