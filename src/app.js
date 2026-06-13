const express = require('express');

const app = express();

app.use((req,res) => {
    res.send("hello from server");
})

app.use("/test",(req,res) => {
    res.send("gettt this")
})

app.listen(3000,()=>{
    console.log("Listening port 3000");
});