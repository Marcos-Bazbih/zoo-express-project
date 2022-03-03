const mongoose = require("mongoose");

const Employee = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    email: {
        type: String, required: true, unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    phone: { type: String, required: true }
},
    { timestamps: true }
);

module.exports = mongoose.model("Employee", Employee);
