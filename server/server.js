require("dotenv").config();
require("./DB");

const express = require("express");
const app = express();
const port = process.env.PORT || 5050;
const cors = require("cors");
const animalsRoutes = require("./routes/animals-routes");
const employeesRoutes = require("./routes/employees-routes");
const usersRoutes = require("./routes/users-routes");

app.use(express.json());
app.use(cors());

app.listen(port, () => { console.log(`connected to port ${port}`) });

app.get("/", (req, res) => { res.status(200).json("Welcome to my zoo") });
app.use("/animals", animalsRoutes);
app.use("/employees", employeesRoutes);
app.use("/auth", usersRoutes);