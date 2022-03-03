const users = require("../models/user-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
    register: async (req, res) => {
        try {
            if (await users.exists({ email: req.body.email })) {
                return res.status(400).json({ success: false, message: "user with that email already exists" });
            };
            let { username, password, email } = req.body;
            bcrypt.hash(password, 10, async (err, hashPassword) => {
                if (err) return res.status(400).json({ success: false, message: err.message });
                password = hashPassword;
                const user = new users({ username, password, email })
                await users.create(user)
                    .then(() => res.status(200).json({ success: true, message: "user added successfully" }))
                    .catch(err => res.status(500).json({ success: false, message: err.message }))
            })
        }
        catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    },
    login: async (req, res) => {
        try {
            const user = await users.findOne({ email: req.body.email });
            if (!user) return res.status(400).json({ success: false, message: "no user found" });

            bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
                if (err) return res.status(500).json({ success: false, message: err.message });
                if (!isMatch) return res.status(400).json({ success: false, message: "password incorrect" });

                const token = jwt.sign({ user }, process.env.SECRET_KEY, { expiresIn: "30m" });
                return res.status(200).json({ success: true, message: "login successful", token });
            });
        }
        catch (err) {
            res.status(500).json({ success: false, message: err.message });
        };
    }
};