const express = require('express');

function createPetRoutes(container) {
    const router = express.Router();
    const petController = container.get('petController');

    router.post('/', (req, res) => petController.createPet(req, res));
    router.get('/', (req, res) => petController.getAllPets(req, res));
    router.get('/:id', (req, res) => petController.getPetById(req, res));
    router.put('/:id', (req, res) => petController.updatePet(req, res));
    router.delete('/:id', (req, res) => petController.deletePet(req, res));

    return router;
}

module.exports = createPetRoutes;