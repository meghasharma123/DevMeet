const express = require('express');
const { userAuth } = require("../middlewares/AuthenticationCheck");
const ConnectionRequestModel = require("../models/connectionRequest");

const userRouter = express.Router();

userRouter.get("/user/requests", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const data = await ConnectionRequestModel
            .find({ toUserId: loggedInUser._id, status: "interested" })
            .populate("fromUserId", ["firstName", "lastName", "emailId"]);

        res.json({
            "message": "Fetched",
            "data": data
        })
    } catch (error) {
        res.status(400).send("Error: " + error.message);
    }
})

module.exports = { userRouter };