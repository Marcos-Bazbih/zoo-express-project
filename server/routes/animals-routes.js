const animalsRoutes = require("express").Router();
const { GetAnimals, GetAnimalById, AddAnimal, DeleteAnimal, UpdateAnimal } = require("../controllers/animals-controller");

animalsRoutes.get("/", GetAnimals);
animalsRoutes.get("/:id", GetAnimalById);
animalsRoutes.post("/", AddAnimal);
animalsRoutes.put("/:id", UpdateAnimal)
animalsRoutes.delete("/:id", DeleteAnimal);

module.exports = animalsRoutes; 