const express = require('express');
const googleapis = require('google-auth-library');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/Travelagency');
const app = express();

//Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());

//Routes
app.use('/users', require('./routes/users'));

//Start server

const port = process.env.PORT || 3000;

app.listen(port);
console.log(`Listening to port ${port} `);
