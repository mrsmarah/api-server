'use strict';
const categorySchema = require('./categories-schema.js');
const Model = require('./main-collection.js');

class Category extends Model {
  constructor() {
    super(categorySchema);
  }
}

module.exports = new Category();
