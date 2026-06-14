const express = require('express');
const { adminAuth, userAuth } = require('./middlewares/AuthenticationCheck');
const { connectDatabase } = require('./config/database');

const app = express();

connectDatabase().then(() => {
    console.log("Connection established.");
    app.listen(3000, () => {
        console.log("Listening port 3000");
    });
}).catch((err) => {
    console.log("Unable to connect to database", err);
})