const express = require('express');

function createStoreRoutes(container) {
    const router = express.Router();
    const storeController = container.get('storeController');

    router.get('/pets', (req, res) => storeController.getAvailablePets(req, res));
    router.post('/checkout', (req, res) => storeController.checkout(req, res));

    return router;
}

module.exports = createStoreRoutes;