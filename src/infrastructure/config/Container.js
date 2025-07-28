const MongoPetRepository = require('../adapters/repositories/MongoPetRepository');
const PetUseCases = require('../../application/use-cases/PetUseCases');
const StoreUseCases = require('../../application/use-cases/StoreUseCases');
const PetController = require('../adapters/controllers/PetController');
const StoreController = require('../adapters/controllers/StoreController');

class Container {
    constructor() {
        this._instances = new Map();
        this._setupDependencies();
    }

    _setupDependencies() {
        this._instances.set('petRepository', new MongoPetRepository());
        
        this._instances.set('petUseCases', new PetUseCases(
            this._instances.get('petRepository')
        ));
        
        this._instances.set('storeUseCases', new StoreUseCases(
            this._instances.get('petRepository')
        ));
        
        this._instances.set('petController', new PetController(
            this._instances.get('petUseCases')
        ));
        
        this._instances.set('storeController', new StoreController(
            this._instances.get('storeUseCases')
        ));
    }

    get(name) {
        const instance = this._instances.get(name);
        if (!instance) {
            throw new Error(`Service ${name} not found in container`);
        }
        return instance;
    }
}

module.exports = Container;