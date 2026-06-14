const express = require('express');
const { adminAuth, userAuth } = require('./middlewares/AuthenticationCheck');
require('./config/database');

const app = express();

app.listen(3000, () => {
    console.log("Listening port 3000");
});