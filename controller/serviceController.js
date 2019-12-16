'use strict';

//Base requires

const  {join} = require('path');
const express = require ('express');
const router = express.Router();

//Get serviceSchema
const serviceSchema = require(join(__dirname, '..', 'schema', 'serviceSchema'));

router.get('/', (req, res) => {
    serviceSchema.find(null, (err, docs) => {
        if (err){
            console.log(err);
        }else{
            res.json({docs});
        }
    })
});

router.get('/add', (req, res) => {
    let newService = new serviceSchema({
        name : 'test'
    });
    newService.save(function (err, service) {
        if(err){
            return console.error(err);
        }else{
            console.log(service.name + " saved to services collection.");
        }
    });
})

module.exports = {
    router
};