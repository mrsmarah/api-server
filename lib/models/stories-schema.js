'use strict';
require('dotenv').config();
const mongoose = require('mongoose');

let commentSchema = mongoose.Schema({
  username: { type: String },
  theComment: { type: String },
});

const stories = mongoose.Schema({
  username: { type: String, required: true },
  title: { type: String, required: true },
  text: {type: String, required: true},
  blogTitle: { type: String, required: true },
  comment: [commentSchema],
});

module.exports = mongoose.model('stories', stories);