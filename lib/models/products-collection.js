'use strict';
const productSchema = require('./products-schema.js');
const Model = require('./mongo.js');

class Product extends Model {
  constructor() {
    super(productSchema);
  }
}

module.exports = new Product();
