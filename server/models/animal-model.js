const mongoose = require("mongoose");

const Animal = new mongoose.Schema({
    name: { type: String, required: true },
    birthday: { type: Date, required: true },
    cageNumber: { type: Number, required: true },
    gender: { type: String, required: true },
    type: { type: String, required: true }
},
    { timestamps: true }
);

module.exports = mongoose.model("Animal", Animal);