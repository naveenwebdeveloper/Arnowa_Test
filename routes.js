const express = require("express");
const userModel = require("./models");
const app = express();

app.post("/add_user", async(request, response) => {
    console.log
    const user = new userModel(request.body);

    try {
        await user.save();
        console.log("Data saved to DB");
        response.json(user);
    } catch (error) {
        console.log(error);
        response.status(500).json(error);
    }
});

app.get("/users", async(request, response) => {
    const users = await userModel.find({});

    try {
        response.json(users);
    } catch (error) {
        console.log(error);
        response.status(500).json(error);
    }
});

module.exports = app;