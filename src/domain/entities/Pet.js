class Pet {
    constructor(name, species, age, price, id = null) {
        this.validateName(name);
        this.validateSpecies(species);
        this.validateAge(age);
        this.validatePrice(price);

        this.id = id;
        this.name = name;
        this.species = species;
        this.age = age;
        this.price = price;
    }

    validateName(name) {
        if (!name || typeof name !== 'string' || name.trim().length === 0) {
            throw new Error('Pet name is required and must be a non-empty string');
        }
    }

    validateSpecies(species) {
        if (!species || typeof species !== 'string' || species.trim().length === 0) {
            throw new Error('Pet species is required and must be a non-empty string');
        }
    }

    validateAge(age) {
        if (age === undefined || age === null || typeof age !== 'number' || age < 0) {
            throw new Error('Pet age is required and must be a non-negative number');
        }
    }

    validatePrice(price) {
        if (price === undefined || price === null || typeof price !== 'number' || price < 0) {
            throw new Error('Pet price is required and must be a non-negative number');
        }
    }

    updateName(newName) {
        this.validateName(newName);
        this.name = newName;
    }

    updateAge(newAge) {
        this.validateAge(newAge);
        this.age = newAge;
    }

    updatePrice(newPrice) {
        this.validatePrice(newPrice);
        this.price = newPrice;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            species: this.species,
            age: this.age,
            price: this.price
        };
    }
}

module.exports = Pet;