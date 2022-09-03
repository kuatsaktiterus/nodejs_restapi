const express = require('express');
const app = express();
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
const port = 3000;

require('dotenv/config');

app.use(express.json());

// Import Routes
const apiRoute = require('./routes/api.route');

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