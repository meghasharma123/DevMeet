const express = require('express');
const { userAuth } = require("../middlewares/AuthenticationCheck");
const ConnectionRequestModel = require("../models/connectionRequest");
const { User } = require('../models/user');

const requestRouter = express.Router();

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const allowedStatus = ["interested", "ignored"]
        if (!allowedStatus.includes(status)) {
            throw new Error(`${status} is not valid.`)
        }

        const toUserPresent = await User.findById(toUserId);
        if (!toUserPresent) {
            throw new Error("Requesting id is not present.");
        }

        // check if request is already present from any side.
        const existingRequest = await ConnectionRequestModel.findOne({
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId }
            ]
        });
        if (existingRequest) {
            throw new Error("Request Already present")
        }

        const data = new ConnectionRequestModel({
            fromUserId, toUserId, status
        });

        await data.save();

        res.json({
            "message": "Data Saved",
            "data": data
        })

    } catch (error) {
        res.status(400).send("Error: " + error.message)
    }
})

requestRouter.post("/request/review/:status/:requestId", userAuth, async(req, res) => {
    try {
        const loggedInUser = req.user; // toUserId
        const { status, requestId } = req.params;

        const allowedStatus = ["accepted", "rejected"];
        if (!allowedStatus.includes(status)) {
            throw new Error("Status not allowed.")
        }

        const connectionRequest = await ConnectionRequestModel.findOne({
            _id: requestId,
            toUserId: loggedInUser._id,
            status: "interested"
        });
        if (!connectionRequest) {
            throw new Error("Not a valid request.");
        }

        connectionRequest.status = status;

        const data = await connectionRequest.save();

        res.json({
            "message": "Status updated",
            "data": data
        })

    } catch (error) {
        res.status(400).send("Error: " + error.message)
    }
})

module.exports = { requestRouter }