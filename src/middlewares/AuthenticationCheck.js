const jwt = require('jsonwebtoken');
const { User } = require("../models/user")

const userAuth = async (req, res, next) => {
    try {
        const cookie = req.cookies;
        
        const { token } = cookie;

        if (!token) {
            throw new Error("Invalid token!");
        }

        const msg = await jwt.verify(token, "megha@3940");

        const { _id } = msg;

        const user = await User.findById(_id);

        if (!user) {
            throw new Error("Invalid user");
        }

        req.user = user;

        next();
    } catch (error) {
        res.status(400).send("Error: " + error.message)
    }
}

module.exports = { userAuth };