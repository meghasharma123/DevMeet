const express = require('express');
const bcrypt = require('bcrypt');
const { userAuth } = require('../middlewares/AuthenticationCheck');
const { validateEditProfileData } = require('../utils/validation')

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try {
        const user = req.user;

        res.send(user)
    } catch (error) {
        res.status(400).send("Error: " + error.message);
    }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {
        const isValid = validateEditProfileData(req);
        if (!isValid) {
            throw new Error("Not a valid edit field")
        }

        const loggedInUser = req.user;

        Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

        await loggedInUser.save();

        res.json({ "message": "Updated", "data": loggedInUser })
    } catch (error) {
        res.status(400).send("Error: " + error.message);
    }
})

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
    try {
        const { password } = req.body;
        const hashPswd = await bcrypt.hash(password, 10);

        const loggedInUser = req.user;

        loggedInUser.password = hashPswd;

        loggedInUser.save();

        res.json({
            message: "Updated",
            body: loggedInUser
        })
    } catch (error) {
        res.status(400).send("Error: " + error.message);
    }
})

module.exports = { profileRouter }