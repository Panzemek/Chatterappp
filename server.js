const express = require("express");
const mongoose = require("mongoose");

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