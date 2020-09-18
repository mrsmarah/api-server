'use strict';
const schema = require('./blogs-schema');
const Model = require('./model.js');

class Blogs extends Model {
  constructor() {
    super(schema);
  }

}

module.exports = new Blogs();