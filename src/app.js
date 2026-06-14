const express = require('express');
const { adminAuth, userAuth } = require('../middlewares/AuthenticationCheck');

const app = express();

app.use("/admin", adminAuth)

app.get("/admin/getAllUser", (req, res) => {
    // try {
        throw new Error("xysss")
    // } catch (error) {
    //     res.status(500).send("something went wrong");
    // }
})

app.use("/",(err,req,res,next) => {
    res.status(500).send("Wild exit.")
})

app.get("/user/login", (req, res) => {
    res.send("Login");
})

app.get("/user", userAuth, (req, res) => {
    res.send("valid user");
})

app.listen(3000, () => {
    console.log("Listening port 3000");
});