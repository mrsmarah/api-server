'use strict';
const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  category: { type: String, required: true },  
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  inStock: { type: Number, required: true },
  image: { type: String, required: false },
  inventory_count: { type: Number, required: false },

});

/**
 * products schema module 
 * @module productSchema
 */

module.exports = mongoose.model('productSchema', productSchema);
