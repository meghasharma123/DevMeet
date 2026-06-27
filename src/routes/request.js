const express = require('express');

const requestRouter = express.Router();

requestRouter.post("/sendConnectionRequest", async (req, res) => {
    res.send("Working request")
})

module.exports = { requestRouter }