class StoreController {
    constructor(storeUseCases) {
        if (!storeUseCases) {
            throw new Error('StoreUseCases is required');
        }
        this.storeUseCases = storeUseCases;
    }

    async getAvailablePets(req, res) {
        try {
            const pets = await this.storeUseCases.getAvailablePets();
            const petsJson = pets.map(pet => pet.toJSON());
            res.status(200).json(petsJson);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async checkout(req, res) {
        try {
            const result = await this.storeUseCases.checkout(req.body.petIds);
            const resultJson = {
                message: result.message,
                pets: result.pets.map(pet => pet.toJSON())
            };
            res.status(200).json(resultJson);
        } catch (error) {
            if (error.message === 'One or more pets not found') {
                res.status(404).json({ message: error.message });
            } else {
                res.status(400).json({ message: error.message });
            }
        }
    }
}

module.exports = StoreController;