const Pet = require('../../domain/entities/Pet');

class PetUseCases {
    constructor(petRepository) {
        if (!petRepository) {
            throw new Error('PetRepository is required');
        }
        this.petRepository = petRepository;
    }

    async createPet(petData) {
        const { name, species, age, price } = petData;
        
        const pet = new Pet(name, species, age, price);
        const savedPet = await this.petRepository.create(pet);
        
        return savedPet;
    }

    async getAllPets() {
        const pets = await this.petRepository.findAll();
        return pets;
    }

    async getPetById(id) {
        if (!id) {
            throw new Error('Pet ID is required');
        }

        const pet = await this.petRepository.findById(id);
        if (!pet) {
            throw new Error('Pet not found');
        }

        return pet;
    }

    async updatePet(id, petData) {
        if (!id) {
            throw new Error('Pet ID is required');
        }

        const existingPet = await this.petRepository.findById(id);
        if (!existingPet) {
            throw new Error('Pet not found');
        }

        const { name, species, age, price } = petData;
        const updatedPetData = new Pet(name, species, age, price, id);
        
        const updatedPet = await this.petRepository.update(id, updatedPetData);
        return updatedPet;
    }

    async deletePet(id) {
        if (!id) {
            throw new Error('Pet ID is required');
        }

        const existingPet = await this.petRepository.findById(id);
        if (!existingPet) {
            throw new Error('Pet not found');
        }

        await this.petRepository.delete(id);
        return { message: 'Pet deleted successfully' };
    }
}

module.exports = PetUseCases;