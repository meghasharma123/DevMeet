const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../models/user');
const { validateSignUpData } = require('../utils/validation')

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
    try {
        const { firstName, lastName, emailId, password, age, gender } = req.body;
        // validate user
        validateSignUpData(req);
        // encrypt password
        const passwordHash = await bcrypt.hash(password, 10);

        const user1 = new User({
            firstName,
            lastName, emailId, password: passwordHash, age, gender
        });

        const resVal = await user1.save();
        res.send("User saved successfully!" + resVal);
    } catch (error) {
        res.status(400).send("Error saving data: " + error.message);
    }
})

authRouter.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;

        const user = await User.findOne({ emailId: emailId });

        if (!user) {
            throw new Error("User not found");
        }

        const isValid = await user.verifyPassword(password);

        if (isValid) {
            const token = await user.getJWT();

            res.cookie("token", token);
            res.send(user)
        } else {
            throw new Error("Password incorect")
        }
    } catch (error) {
        res.status(400).send("Error: " + error.message);
    }
})

authRouter.post("/logout", (req, res) => {
    try {
        res.cookie("token", null, {
            expires: new Date(Date.now())
        });
        res.send("Logout successfully.")
    } catch (error) {
        res.status(400).send("Error: " + error.message)
    }
})

module.exports = { authRouter }