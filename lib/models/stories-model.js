'use strict';
const schema = require('./stories-schema');
const Model = require('./model.js');

class Stories extends Model {
  constructor() {
    super(schema);
  }
  
}

module.exports = new Stories();