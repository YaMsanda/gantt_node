'use strict';
const port = 3000;
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const {join} = require('path');

mongoose.connect('mongodb://localhost:27017/nodegantt', {useNewUrlParser: true}, () => {
    if(error){
        console.log(error);
        process.exit(1);
    }
});

const service = require(join(__dirname, 'controller', 'serviceController.js'));

app.use('/service', service.router);

app.listen(port, () => console.log('!! server online on '+port));