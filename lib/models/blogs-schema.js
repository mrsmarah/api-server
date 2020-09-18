'use strict';

const mongoose = require('mongoose');

const blog = mongoose.Schema({

  blogTitle: { type: String, require : true, unique: true },

},{toObject:{virtual:true},toJSON:{virtual:true}});


blog.virtual('stories',{
  ref:'stories',
  localField:'blogTitle',
  foreignField:'blogTitle',
  justOne:true,
  
});


module.exports = mongoose.model('blog', blog);