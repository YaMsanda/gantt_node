'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
    nameService: {type: String, required:true, unique: true, trim: true}
});

module.exports = mongoose.model('serviceSchema', serviceSchema);