const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const Container = require('./infrastructure/config/Container');
const createPetRoutes = require('./infrastructure/routes/pets');
const createStoreRoutes = require('./infrastructure/routes/store');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const container = new Container();

app.use('/api/pets', createPetRoutes(container));
app.use('/api/store', createStoreRoutes(container));

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
});