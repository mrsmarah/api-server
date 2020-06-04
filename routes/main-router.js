'use strict';
const express = require('express');
const productsModel = require('../lib/models/products-collection.js');
const categoriesModel = require('../lib/models/categories-collection.js');
const router = express.Router();

router.param('model', getModel);
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

router.post('/:model', postHandler);
router.get('/:model', getAllHandler);
router.get('/:model/:_id', getOneHandler);
router.put('/:model/:_id', updateHandler);
router.delete('/:model/:_id', deleteHandler);


function postHandler(req, res, next) {
  req.model
    .create(req.body)
    .then((data) => res.json(data))
    .catch((err) => next(err.message));
}
  
function getAllHandler(req,res,next){
  req.model
    .read()
    .then((data) => {
      const count = data.length;
      const results = data;
      const allData = { count,results};
      res.json(allData);
    })
    .catch(next);
      
}
  
function getOneHandler(req,res,next){
  req.model
    .read(req.params._id)
    .then((data) =>res.json(data))
    .catch(next);
}
  
function updateHandler(req,res,next){
  req.model
    .update(req.params._id , req.body)
    .then((data) => {
      res.json(data);
    })
    .catch(next);    
}
  
function deleteHandler(req,res,next){
  req.model
    .delete(req.params._id)
    .then((data) => res.send(`_id: ${req.params._id} deleted!`))
    .catch(next);  
}

module.exports = router;

  
