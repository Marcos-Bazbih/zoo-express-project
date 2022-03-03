const animals = require("../models/animal-model");

module.exports = {
    GetAnimals: async (req, res) => {
        try {
            const data = await animals.find();
            if (data && data.length >= 1) return res.status(200).json({ success: true, data });
            res.status(404).json({ success: false, message: "no animals found" });
        }
        catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    },
    GetAnimalById: async (req, res) => {
        try {
            const animal = await animals.findOne({ _id: req.params.id });
            if (animal) return res.status(200).json({ success: true, animal });
            res.status(404).json({ success: false, message: "no animal found" });
        }
        catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    },
    AddAnimal: async (req, res) => {
        try {
            const { name, birthday, cageNumber, gender, type } = req.body;
            const animal = new animals({ name, birthday, cageNumber, gender, type });
            if (!animal) return res.status(400).json({ success: false, message: "animal not valid" })

            await animals.create(animal)
                .then(() => res.status(201).json({ success: true, message: "animal successfully added" }))
                .catch((err) => res.status(400).json({ success: false, message: err.message }))
        }
        catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    },
    UpdateAnimal: async (req, res) => {
        try {
            if (await animals.exists({ _id: req.params.id })) {
                return await animals.findByIdAndUpdate(req.params.id, req.body)
                    .then(() => res.status(200).json({ success: true, message: "animal updated successfully" }))
                    .catch((err) => res.status(400).json({ success: false, message: err.message }))
            }
            res.status(404).json({ success: false, message: "no animal found" });
        }
        catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    },
    DeleteAnimal: async (req, res) => {
        try {
            if (await animals.exists({ _id: req.params.id })) {
                return await animals.findByIdAndRemove(req.params.id)
                    .then(() => res.status(200).json({ success: true, message: "animal deleted successfully" }))
                    .catch(err => res.status(400).json({ success: false, message: err.message }))
            }
            res.status(404).json({ success: false, message: "no animal found" });
        }
        catch (err) {
            res.status(500).json({ success: false, message: err.message });
        };
    }
};