const employeesRoutes = require("express").Router();
const { GetEmployees, GetEmployeeById, AddEmployee, DeleteEmployee, UpdateEmployee } = require("../controllers/employees-controller");

employeesRoutes.get("/", GetEmployees);
employeesRoutes.get("/:id", GetEmployeeById);
employeesRoutes.post("/", AddEmployee);
employeesRoutes.put("/:id", UpdateEmployee)
employeesRoutes.delete("/:id", DeleteEmployee);

module.exports = employeesRoutes; 