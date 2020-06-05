'use strict';

const productSchema = require('./products-schema.js');
const Model = require('./mongo.js');


/**
 * Products Model module 
 * @module productsCollection
 */

/**
 * Class Products extends to the Model class from mongo module 
 * @extends Model
 *   
 */

class Product extends Model {
  constructor() {
    super(productSchema);
  }
}

module.exports = new Product();
