const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require("./Middlewares/session");
const trimBody = require("./Middlewares/trimBody");
const cors = require("./Middlewares/cors");
const { getSingleInstance } = require("./Models/Dashboard");
const homeController = require("./Controllers/homeController");
const userController = require("./Controllers/userController");
const recipeController = require("./Controllers/recipeController");
const adminController = require("./Controllers/adminController");

const connectionStr = "mongodb://127.0.0.1:27017/VueJS-Project-Defence";

start();

async function start() {
    try {
        await mongoose.connect(connectionStr);
        console.log("DATABASE OPERATIONAL");

        const app = express();
        const DASHBOARD = await getSingleInstance();
        app.locals.DASHBOARD = DASHBOARD;

        app.use(express.json());
        app.use(cookieParser());
        app.use(trimBody());
        app.use(session());
        app.use(cors())

        app.all("/REST-TEST*", (req, res) => {
            res.json({ message: `REST SERVICE OPERATIONAL => URL PATH: ${req.url}` });
        });

        app.use("/", homeController);
        app.use("/users", userController);
        app.use("/recipes", recipeController);
        app.use("/secret-path/admin", adminController);

        app.listen(3030, () => console.log("REST SERVICE STARTED SUCCESSFULLY"))
    } catch (error) {
        console.log(error);
        console.log(error.message);
        process.exit(1);
    }
};