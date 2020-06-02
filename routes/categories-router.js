'use strict';
const express = require('express');
const categoriesModel = require('../lib/models/categories-collection.js');
const router = express.Router();

router.post('/', postCategories);
router.get('/', getCategories);
router.get('/:_id', getOneCategory);
router.put('/:_id', updateCategory);
router.delete('/:_id', deleteCategory);

function postCategories(req, res, next) {
  categoriesModel
    .create(req.body)
    .then((data) => res.json(data))
    .catch((err) => next(err.message));
}

function getCategories(req,res,next){
  categoriesModel
    .read()
    .then((data) => {
      const count = data.length;
      const results = data;
      const allData = { count,results};
      res.json(allData);
    })
    .catch(next);
}

function getOneCategory(req,res,next){
  categoriesModel
    .read(req.params._id)
    .then((data) => res.json(data))
    .catch(next);
}

function updateCategory(req,res,next){
  categoriesModel
    .update(req.params._id , req.body)
    .then((data) => res.json(data))
    .catch(next);    
}

function deleteCategory(req,res,next){
  categoriesModel
    .delete(req.params._id)
    .then((data) => res.send(`_id: ${req.params._id} deleted!`))
    .catch(next);  
}

module.exports = router;

// //Categories routes INLINE MEMORY

// let categoriesDB = [];

// app.post('/categories', (req, res) => {
//   const data = {
//     name: req.body.name,
//     display_name: req.body.display_name,
//     description: req.body.description};
//   categoriesDB.push(data);
//   res.status(201).json(data); 
// });

// app.get('/categories', (req, res) => {
//   const count = categoriesDB.length;
//   const results = categoriesDB;
//   const data = { count,results};
//   res.status(200).json(data);
// });

// app.get('/categories/:id', (req, res) => {
//   const paramId = req.params.id;
//   res.status(200).json(categoriesDB[paramId]);
// });

// app.put('/categories/:id', (req, res) => {
//   const data = {
//     name: req.body.name,
//     display_name: req.body.display_name,
//     description: req.body.description};
//   const paramId = req.params.id;
//   categoriesDB[paramId] = data ;
//   res.status(201).json(categoriesDB[paramId]);
// });

// app.delete('/categories/:id', (req, res) => {
//   const paramId = req.params.id;
//   categoriesDB.splice(paramId,1);
//   res.status(200).send('product deleted!');
// });
