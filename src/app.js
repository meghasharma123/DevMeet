const express = require('express');
const { connectDatabase } = require('./config/database');
const { User } = require('./models/user')
const cookieParser = require('cookie-parser')

const app = express();

app.use(express.json());
app.use(cookieParser());

const { authRouter } = require('./routes/auth');
const { profileRouter } = require('./routes/profile');
const { requestRouter } = require('./routes/request');
const { userRouter } = require("./routes/users")

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

connectDatabase().then(() => {
    console.log("Connection established.");
    app.listen(3000, () => {
        console.log("Listening port 3000");
    });
}).catch((err) => {
    console.log("Unable to connect to database" + err);
})