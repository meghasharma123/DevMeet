const express = require('express');
const { adminAuth, userAuth } = require('../middlewares/AuthenticationCheck');

const app = express();

app.use("/admin", adminAuth)

app.get("/admin/getAllUser", (req, res) => {
    res.send("Fetched all user info!");
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