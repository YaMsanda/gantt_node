'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
    nameService: { type: String, required: true, unique: true, trim: true },
    serviceData: { type: String, required: true, unique: false, trim: false }
});

module.exports = mongoose.model('serviceSchema', serviceSchema);