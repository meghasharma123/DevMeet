//  vjhQHH1390NZ2Gyf

const mongoose = require('mongoose');

const connect = async () => {
    await mongoose.connect('mongodb://meghasharma2822000_db_user:vjhQHH1390NZ2Gyf@ac-7vi2ic1-shard-00-00.phediio.mongodb.net:27017,ac-7vi2ic1-shard-00-01.phediio.mongodb.net:27017,ac-7vi2ic1-shard-00-02.phediio.mongodb.net:27017/?ssl=true&replicaSet=atlas-la2kzh-shard-0&authSource=admin&appName=NamasteNode');
}

connect().then(() => {
    console.log("Connection established.")
}).catch((err) => {
    console.log("Unable to connect to database",err);
})
