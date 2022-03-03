const mongoose = require("mongoose");

const User = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: {
        type: String, required: true, unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    }
},
    { timestamps: true }
);

module.exports = mongoose.model("User", User);