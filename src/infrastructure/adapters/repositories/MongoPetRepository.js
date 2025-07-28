const PetRepository = require('../../../domain/ports/PetRepository');
const Pet = require('../../../domain/entities/Pet');
const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
    name: { type: String, required: true },
    species: { type: String, required: true },
    age: { type: Number, required: true },
    price: { type: Number, required: true },
});

const PetModel = mongoose.model('Pet', petSchema);

class MongoPetRepository extends PetRepository {
    async create(pet) {
        const petModel = new PetModel({
            name: pet.name,
            species: pet.species,
            age: pet.age,
            price: pet.price
        });

        const savedPet = await petModel.save();
        return new Pet(
            savedPet.name,
            savedPet.species,
            savedPet.age,
            savedPet.price,
            savedPet._id.toString()
        );
    }

    async findAll() {
        const pets = await PetModel.find();
        return pets.map(pet => new Pet(
            pet.name,
            pet.species,
            pet.age,
            pet.price,
            pet._id.toString()
        ));
    }

    async findById(id) {
        try {
            const pet = await PetModel.findById(id);
            if (!pet) return null;

            return new Pet(
                pet.name,
                pet.species,
                pet.age,
                pet.price,
                pet._id.toString()
            );
        } catch (error) {
            if (error.name === 'CastError') {
                return null;
            }
            throw error;
        }
    }

    async update(id, petData) {
        try {
            const updatedPet = await PetModel.findByIdAndUpdate(
                id,
                {
                    name: petData.name,
                    species: petData.species,
                    age: petData.age,
                    price: petData.price
                },
                { new: true }
            );

            if (!updatedPet) return null;

            return new Pet(
                updatedPet.name,
                updatedPet.species,
                updatedPet.age,
                updatedPet.price,
                updatedPet._id.toString()
            );
        } catch (error) {
            if (error.name === 'CastError') {
                return null;
            }
            throw error;
        }
    }

    async delete(id) {
        try {
            const deletedPet = await PetModel.findByIdAndDelete(id);
            return deletedPet !== null;
        } catch (error) {
            if (error.name === 'CastError') {
                return false;
            }
            throw error;
        }
    }

    async findByIds(ids) {
        try {
            const pets = await PetModel.find({ '_id': { $in: ids } });
            return pets.map(pet => new Pet(
                pet.name,
                pet.species,
                pet.age,
                pet.price,
                pet._id.toString()
            ));
        } catch (error) {
            if (error.name === 'CastError') {
                return [];
            }
            throw error;
        }
    }
}

module.exports = MongoPetRepository;