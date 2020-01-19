const fs = require('fs');
const app = require('express')();
const server = require('http').Server(app);

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const jsdomOptions = { resources: 'usable', runScripts: 'dangerously' };
const moment = require('moment');

const io = require('socket.io')(server);

const socket = require('socket.io-client');
const mongoose = require('mongoose');

const { join } = require('path');
app.get('/', function(req, res) {

    res.send(JSDOM.fromFile("index.html", jsdomOptions).serialize());
});
let firstGantt = '{"nameService": "Mes_Sch",' +
    '"projects": [{' +
    '"name": "Gantt API dev",' +
    '"desc": "Course : NodeJS, Deadline : 13/01/2020, Create a simple NodeJS API with one page where you can create a gantt chart and send it via sockets, display the other gantt charts that you get via sockets, save the gantt chart you created in a mongodb database using mongoose.",' +
    '"daysOff": { "Mo": true, "Tu": true, "We": true, "Th": true, "Fr": true, "Sa": false, "Su": false },' +
    '"workingHours": { "start": ' + moment().hour(9) + ', "end": ' + moment().hour(18) + ' },' +
    '"task": [{ "id": 0, "name": "tache 1", "desc": "toto", "start": 1491680626329, "end": 1491684607029, "percentageProgress": 50, "color": "#fc0202", "linkedTask": [], "ressources": [] }],' +
    '"groupTask": [{ "name": "optional", "start": ' + Date.parse("16 December 2020") + ', "end": ' + Date.parse("13 January 2020") + ' }],' +
    '"resources": [{ "name": "Lolo", "cost": 0, "type": "humain" }, { "name": "Sch", "cost":0, "type": "mobilier de jardin"}],' +
    '"milestones": [{ "name": "Deadline", "date": ' + Date.parse("13 January 2020") + ' }]' +
    '}]' +
    '}';
firstGantt = JSON.parse(firstGantt);
// io.on('connection', function(socket) {
//     socket.emit('sendUpdate', firstGantt);
//     socket.on('info', function(data) {
//         console.log(data);
//     });
// });

server.listen(3000);
let client = socket.connect('http://51.15.137.122:18000/', { reconnect: true });
client.on('connect', () => {
    console.log('connected')
        //client.emit('sendUpdate', firstGantt);
    client.on('projectUpdated', function(data) {
        console.log(data);
    });
});