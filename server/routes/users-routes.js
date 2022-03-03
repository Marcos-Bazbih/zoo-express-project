const usersRoutes = require("express").Router();
const { register, login } = require("../controllers/users-controller")

usersRoutes.post("/register", register);
usersRoutes.post("/login", login);

module.exports = usersRoutes;