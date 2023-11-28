const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const connectionStr = "mongodb://127.0.0.1:27017/VueJS-Project-Defence";

start();

async function start() {
    try {
        await mongoose.connect(connectionStr);
        console.log("DATABASE OPERATIONAL");

        const app = express();

        app.use(express.json());

        app.all("/REST-TEST/*", (req, res) => {
            res.json({ message: `REST SERVICE OPERATIONAL => URL PATH: ${req.url}` });
        });

        app.listen(3030, () => console.log("REST SERVICE STARTED SUCCESSFULLY"))
    } catch (error) {
        console.log(error);
        console.log(error.message);
    }
};