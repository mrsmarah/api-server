'use strict';
const express = require('express');
const productsModel = require('../lib/models/products-collection.js');
const router = express.Router();

router.post('/', postProducts);
router.get('/', getProducts);
router.get('/:_id', getOneProduct);
router.put('/:_id', updateProduct);
router.delete('/:_id', deleteProduct);

function postProducts(req, res, next) {
  productsModel
    .create(req.body)
    .then((data) => res.json(data))
    .catch((err) => next(err.message));
}

function getProducts(req,res,next){
  productsModel
    .read()
    .then((data) => {
      const count = data.length;
      const results = data;
      const allData = { count,results};
      res.json(allData);
    })
    .catch(next);
    
}

function getOneProduct(req,res,next){
  productsModel
    .read(req.params._id)
    .then((data) =>res.json(data))
    .catch(next);
}

function updateProduct(req,res,next){
  productsModel
    .update(req.params._id , req.body)
    .then((data) => {
      res.json(data);
    })
    .catch(next);    
}

function deleteProduct(req,res,next){
  productsModel
    .delete(req.params._id)
    .then((data) => res.send(`_id: ${req.params._id} deleted!`))
    .catch(next);  
}

module.exports = router;

// // Products routes INLINE MEMORY

// let productsDB = [];

// app.post('/products', (req, res) => {
//   const data = {//undefined req.body if not parsed using(express.json)
//     category: req.body.category,
//     name: req.body.name,
//     display_name: req.body.display_name,
//     description: req.body.description};
//   //we can do this instead:
//   // const { category,name,display_name,description } = req.body;
//   //const data = { category,name,display_name,description };
//   productsDB.push(data);
//   res.status(201).json(data); 
// });

// app.get('/products', (req, res) => {
//   const count = productsDB.length;
//   const results = productsDB;
//   const data = { count,results};
//   res.status(200).json(data);
// });

// app.get('/products/:id', (req, res) => {
//   const paramId = req.params.id;
//   res.status(200).json(productsDB[paramId]);
// });

// app.put('/products/:id', (req, res) => {
// const { category,name,display_name,description } = req.body;
// const data = { category,name,display_name,description };
//   const paramId = req.params.id;
//   productsDB[paramId] = data ;
//   res.status(201).json(productsDB[paramId]);
// });

// app.delete('/products/:id', (req, res) => {
//   const paramId = req.params.id;
//   productsDB.splice(paramId,1);
//   res.status(200).send('product deleted!');
// });


