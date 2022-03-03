const employees = require("../models/employee-model");

module.exports = {
    GetEmployees: async (req, res) => {
        try {
            const data = await employees.find();
            if (data && data.length >= 1) return res.status(200).json({ success: true, data });
            res.status(404).json({ success: false, message: "no employees found" })
        }
        catch (err) {
            res.status(500).json({ success: false, message: err.message })
        }
    },
    GetEmployeeById: async (req, res) => {
        try {
            const employee = await employees.findOne({ _id: req.params.id });
            if (employee) return res.status(200).json({ success: true, employee });
            res.status(404).json({ success: false, message: "no employee found" });
        }
        catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    },
    AddEmployee: async (req, res) => {
        try {
            const { name, role, email, phone } = req.body;
            const employee = new employees({ name, role, email, phone });
            if (!employee) return res.status(400).json({ success: false, message: "employee not valid" })

            await employees.create(employee)
                .then(() => res.status(201).json({ success: true, message: "employee successfully added" }))
                .catch((err) => res.status(400).json({ success: false, message: err.message }))
        }
        catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    },
    UpdateEmployee: async (req, res) => {
        try {
            if (await employees.exists({ _id: req.params.id })) {
                return await employees.findByIdAndUpdate(req.params.id, req.body)
                    .then(() => res.status(200).json({ success: true, message: "employee updated successfully" }))
                    .catch((err) => res.status(400).json({ success: false, message: err.message }))
            }
            res.status(404).json({ success: false, message: "no employee found" });
        }
        catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    },
    DeleteEmployee: async (req, res) => {
        try {
            if (await employees.exists({ _id: req.params.id })) {
                return await employees.findByIdAndRemove(req.params.id)
                    .then(() => res.status(200).json({ success: true, message: "employee deleted successfully" }))
                    .catch(err => res.status(400).json({ success: false, message: err.message }))
            }
            res.status(404).json({ success: false, message: "no employee found" });
        }
        catch (err) {
            res.status(500).json({ success: false, message: err.message });
        };
    }
};