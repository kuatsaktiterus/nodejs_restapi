import express from 'express';
const app = express();
import mongoose from 'mongoose';
// const bodyParser = require('body-parser');
const port = 3001;

import 'dotenv/config';

app.use(express.json());

// Import Routes
import {router as apiRoute} from './routes/api.route.js';

app.use('/api', apiRoute);

// routes
app.get('/', (req, res) => {
    res.send('Hai Dunia!!!!');
});

// connect to db
mongoose.connect(process.env.DB_CONNECTION, 
    {   useNewUrlParser: true,
        useUnifiedTopology: true }, 
    () => {
    console.log('connected to db');
})

app.listen(port, () => {
    console.log(`Sudah Terhubung ke port ${port}`);
});