const express = require('express');
const { adminAuth, userAuth } = require('./middlewares/AuthenticationCheck');
const { connectDatabase } = require('./config/database');
const { User } = require('./models/user')

const app = express();

app.use(express.json());

app.post("/user", async (req, res) => {
    const user1 = new User(req.body);
    try {
        const resVal = await user1.save();
        res.send("User saved successfully!" + resVal);
    } catch (error) {
        res.status(500).send("Error saving data: " + error);
    }
})

app.get("/feed", async (req, res) => {
    try {
        const result = await User.find({});
        res.send(result);
    } catch (error) {
        res.status(500).send("Failed!");
    }
})

app.get("/user", async (req, res) => {
    try {
        const emailId = req.body.emailId;

        const result = await User.find({ email: emailId });
        res.send(result);
    } catch (error) {
        res.status(500).send("Failed!");
    }
})

app.delete("/user", async (req, res) => {
    try {
        const userId = req.body.id;
        console.log("userid: ", userId)
        await User.findByIdAndDelete(userId);

        res.send("Deleted");
    } catch (error) {
        res.status(500).send("Failed!");
    }
})

app.patch("/user/:id", async (req, res) => {
    try {
        const userId = req.params?.id;
        const data = req.body;

        const ALLOWED_UPDATES = ["photoUrl", "about", "age", "gender", "skills"];

        const isAllowed = Object.keys(data).every(k => ALLOWED_UPDATES.includes(k));

        if (!isAllowed) {
            throw new Error("Update not allowed");
        }

        if (data?.skills.length > 10) {
            throw new Error("Skills cannot be more than 10");
        }

        const resVal = await User.findByIdAndUpdate(userId, data, {
            runValidators: true,
            returnDocument: "after"
        });

        res.send("updated" + resVal);
    } catch (error) {
        res.status(500).send("" + error);
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