'use strict';

const categorySchema = require('./categories-schema.js');
const Model = require('./mongo.js');

/**
 * Categories Model module 
 * @module categoriesCollection
 */

/**
 * Class Categories extends to the Model class from mongo module 
 * @extends Model
 *   
 */

class Category extends Model {
  constructor() {
    super(categorySchema);
  }
}

module.exports = new Category();
