const express = require("express");
const { userAuth } = require("../middlewares/AuthenticationCheck");
const ConnectionRequestModel = require("../models/connectionRequest");
const { User } = require("../models/user");

const userRouter = express.Router();

const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills";

userRouter.get("/user/requests", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const data = await ConnectionRequestModel.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", USER_SAFE_DATA);

    res.json(data);
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const data = await ConnectionRequestModel.find({
      $or: [
        { fromUserId: loggedInUser._id, status: "accepted" },
        { toUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    const listOfConnections = data.map((ele) => {
      if (loggedInUser._id.equals(ele.fromUserId._id)) {
        return ele.toUserId;
      }
      return ele.fromUserId;
    });

    res.json(listOfConnections);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

userRouter.get("/user/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const page = 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const connections = await ConnectionRequestModel.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    });

    const hideFromFeed = new Set();
    connections.forEach((usr) => {
      hideFromFeed.add(usr.fromUserId.toString());
      hideFromFeed.add(usr.toUserId.toString());
    });

    const data = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    })
      .select(USER_SAFE_DATA)
      .skip(skip)
      .limit(limit);

    res.json(data);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = { userRouter };
