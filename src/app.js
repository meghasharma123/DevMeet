const express = require('express');
const { adminAuth, userAuth } = require('./middlewares/AuthenticationCheck');
const { connectDatabase } = require('./config/database');
const { User } = require('./models/user')

const app = express();

app.post("/user", async (req, res) => {
    const user1 = new User({
        firstName: "megha",
        lastName: "sharma",
        email: "megha@sharma.com",
        password: "megha@12232"
    });

    try {
        await user1.save();
        res.send("User saved successfully!");
    } catch (error) {
        res.status(500).send("Error saving data: ", error.message);
    }
})

connectDatabase().then(() => {
    console.log("Connection established.");
    app.listen(3000, () => {
        console.log("Listening port 3000");
    });
}).catch((err) => {
    console.log("Unable to connect to database", err);
})