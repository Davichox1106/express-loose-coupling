class StoreUseCases {
    constructor(petRepository) {
        if (!petRepository) {
            throw new Error('PetRepository is required');
        }
        this.petRepository = petRepository;
    }

    async getAvailablePets() {
        const pets = await this.petRepository.findAll();
        return pets;
    }

    async checkout(petIds) {
        if (!petIds || !Array.isArray(petIds) || petIds.length === 0) {
            throw new Error('Pet IDs array is required and cannot be empty');
        }

        const pets = await this.petRepository.findByIds(petIds);
        
        if (pets.length !== petIds.length) {
            throw new Error('One or more pets not found');
        }

        return {
            message: 'Checkout successful',
            pets: pets
        };
    }
}

module.exports = StoreUseCases;