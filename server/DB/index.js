const mongoose = require("mongoose");

mongoose.connect(process.env.CONNECTION_STRING,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => { console.log("connected to mongoDb") })
    .catch((err) => { console.log(err) });

module.exports = mongoose.connection;