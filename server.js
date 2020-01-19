const port = 3000;
const socket = require('socket.io-client');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const { join } = require('path');
const serviceModel = require('./schema/serviceSchema.js')



mongoose.connect('mongodb://localhost:27017/nodegantt', { useNewUrlParser: true }, () => {
    if (error) {
        console.log(error);
        process.exit(1);
    }
});
var db = mongoose.connection;

function getGanttFromMongoose() {
    serviceModel.find({ 'nameService': 'base' }, 'nameService serviceData', function(err, services) {
        if (err) {
            return handleError(err);
        } else {
            //need to parse services and get it in the right format for client gantt
            return services;
        }
    })
}

function setGanttOnMongoose(data) {
    //need to parse data and get it in the right format for database
    var ganttToInsert = new serviceModel({ nameService: 'base', serviceData: data });
    ganttToInsert.save(function(err, services) {
        if (err) return handleError(err);
    })
}

const service = require(join(__dirname, 'controller', 'serviceController.js'));

app.use('/service', service.router);

app.listen(port, () => console.log('!! server online on ' + port));

const io = require('socket.io')(server);

io.on('connection', (socket) => {
    socket.on('getCurrentGantt', (data) => {
        gantt = getGanttFromMongoose();
        io.sockets.emit('currentGantt', { gantt: gantt });
    })
    socket.on('setCurrentGantt', (data) => {
        setGanttOnMongoose(data);
    }))
})

let client = socket.connect('http://51.15.137.122:18000/', { reconnect: true });
client.on('connect', () => {
    console.log('connected')
    client.emit('needHelp');
});