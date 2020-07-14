'use strict';
const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({ 
  name: { type: String, required: true },
  displayName: { type: String, required: true },
  description: { type: String, required: false },
});

/**
 * categoryies schema module 
 * @module categorySchema
 */

module.exports = mongoose.model('categorySchema', categorySchema);
