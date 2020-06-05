'use strict';

const categoriesModel = require('../lib/models/categories-collection.js');
const productsModel = require('../lib/models/products-collection.js');

/**
 * (Middleware) will select the correct model for the requested route
 * @module getModel
 */

/**
* Input 
* @function getModel
* @param req - request
* @param res  - response
* @param next - next
*/

function getModel(req, res, next) {
  const model = req.params.model; 
  switch (model) {
  case 'categories':
    req.model = categoriesModel;
    next();
    return;
  case 'products':
    req.model = productsModel;
    next();
    return;
  default:
    next('invalid model');
    return;
  }
}


module.exports = getModel;


