const port = 3000;
const socket = require('socket.io-client');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const { join } = require('path');

let client = socket.connect('http://51.15.137.122:18000/', { reconnect: true });
client.on('connect', () => {
    console.log('connected')
    client.emit('needHelp');
});


mongoose.connect('mongodb://localhost:27017/nodegantt', { useNewUrlParser: true }, () => {
    if (error) {
        console.log(error);
        process.exit(1);
    }
});

const service = require(join(__dirname, 'controller', 'serviceController.js'));

app.use('/service', service.router);

app.listen(port, () => console.log('!! server online on ' + port));