const express = require('express');

const app = express();

app.get("/user", (req, res) => {
    res.send("user data fetched.")
})

app.post("/user", (req, res) => {
    res.send("post data to database.")
})

app.delete("/user", (req, res) => {
    res.send("delete data from database.")
})

app.listen(3000, () => {
    console.log("Listening port 3000");
});