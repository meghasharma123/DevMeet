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

userRouter.get("/user/connections", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const data = await ConnectionRequestModel
            .find({
                $or: [
                    { fromUserId: loggedInUser._id, status: "accepted" },
                    { toUserId: loggedInUser._id, status: "accepted" }
                ]
            })
            .populate("fromUserId", ["firstName", "emailId"])
            .populate("toUserId", ["firstName", "emailId"]);


        const listOfConnections = data.map((ele) => {
            if (loggedInUser._id.equals(ele.fromUserId._id)) {
                return ele.toUserId;
            }
            return ele.fromUserId;
        });

        res.json({ "meesgae": "Fetched", "body": listOfConnections });

    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = { userRouter };