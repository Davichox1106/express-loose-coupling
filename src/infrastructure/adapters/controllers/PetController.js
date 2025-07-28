class PetController {
    constructor(petUseCases) {
        if (!petUseCases) {
            throw new Error('PetUseCases is required');
        }
        this.petUseCases = petUseCases;
    }

    async createPet(req, res) {
        try {
            const pet = await this.petUseCases.createPet(req.body);
            res.status(201).json(pet.toJSON());
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getAllPets(req, res) {
        try {
            const pets = await this.petUseCases.getAllPets();
            const petsJson = pets.map(pet => pet.toJSON());
            res.status(200).json(petsJson);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getPetById(req, res) {
        try {
            const pet = await this.petUseCases.getPetById(req.params.id);
            res.status(200).json(pet.toJSON());
        } catch (error) {
            if (error.message === 'Pet not found') {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({ message: error.message });
            }
        }
    }

    async updatePet(req, res) {
        try {
            const pet = await this.petUseCases.updatePet(req.params.id, req.body);
            res.status(200).json(pet.toJSON());
        } catch (error) {
            if (error.message === 'Pet not found') {
                res.status(404).json({ message: error.message });
            } else {
                res.status(400).json({ message: error.message });
            }
        }
    }

    async deletePet(req, res) {
        try {
            const result = await this.petUseCases.deletePet(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            if (error.message === 'Pet not found') {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({ message: error.message });
            }
        }
    }
}

module.exports = PetController;