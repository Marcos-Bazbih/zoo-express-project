require("dotenv").config();
require("./DB");

const express = require("express");
const app = express();
const port = process.env.PORT || 5050;
const cors = require("cors");
const animalsRoutes = require("./routes/animals-routes");
const employeesRoutes = require("./routes/employees-routes");
const usersRoutes = require("./routes/users-routes");
const passport = require("passport");

require("./config/passport")(passport);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.listen(port, () => { console.log(`connected to port ${port}`) });

app.get("/", (req, res) => res.send("<h1>Welcome to my zoo</h1>"))


app.use(passport.initialize());
app.use("/animals", passport.authenticate('jwt', { session: false }), animalsRoutes);
app.use("/employees", passport.authenticate('jwt', { session: false }), employeesRoutes);
app.use("/auth", usersRoutes);