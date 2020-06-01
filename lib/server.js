'use strict';

require('dotenv').config();
const express = require('express');
const timeStamp = require('../middleware/timestamp.js');
const logger = require('../middleware/logger.js');
const middleNotFound = require('../middleware/404.js');
const middleError = require('../middleware/500.js');
const app = express();

let productsDB = [];
let categoriesDB = [];

// global middleware
app.use(express.json()); //body-parser to add body to the req
app.use(timeStamp); //set to run for all routes
app.use(logger);


// Products routes
app.post('/products', (req, res) => {
  const data = {//undefined req.body if not parsed using(express.json)
    category: req.body.category,
    name: req.body.name,
    display_name: req.body.display_name,
    description: req.body.description,
  };
  console.log(req.body);
  productsDB.push(data);
  res.status(201).json(data); 
});

app.get('/products', (req, res) => {
  console.log(req.query);
  const count = productsDB.length;
  const results = productsDB;
  const data = { count,results};
  res.status(200).json(data);
});

app.get('/products/:id', (req, res) => {
  console.log(req.params.id);
  const paramId = req.params.id;
  res.status(200).json(productsDB[paramId]);
});

app.put('/products/:id', (req, res) => {
  const data = {
    category: req.body.category,
    name: req.body.name,
    display_name: req.body.display_name,
    description: req.body.description,
  };
  const paramId = req.params.id;
  productsDB[paramId] = data ;
  console.log(`product with id: ${req.params.id} got updated ${req.body}`);
  res.status(201).json(productsDB[paramId]);
});

app.delete('/products/:id', (req, res) => {
  const paramId = req.params.id;
  productsDB.splice(paramId,1);
  console.log(`product with id: ${req.params.id} has deleted!`);
  res.status(201).send('product deleted!');
});


// Categories routes
app.post('/categories', (req, res) => {
  const data = {
    name: req.body.name,
    display_name: req.body.display_name,
    description: req.body.description,
  };
  console.log(req.body);
  categoriesDB.push(data);
  res.status(201).json(data); 
});

app.get('/categories', (req, res) => {
  console.log(req.query);
  const count = categoriesDB.length;
  const results = categoriesDB;
  const data = { count,results};
  res.status(200).json(data);
});

app.get('/categories/:id', (req, res) => {
  console.log(req.params.id);
  const paramId = req.params.id;
  res.status(200).json(categoriesDB[paramId]);
});

app.put('/categories/:id', (req, res) => {
  const data = {
    category: req.body.category,
    name: req.body.name,
    display_name: req.body.display_name,
    description: req.body.description,
  };
  const paramId = req.params.id;
  categoriesDB[paramId] = data ;
  console.log(`product with id: ${req.params.id} got updated ${req.body}`);
  res.status(201).json(categoriesDB[paramId]);
});

app.delete('/categories/:id', (req, res) => {
  const paramId = req.params.id;
  categoriesDB.splice(paramId,1);
  console.log(`product with id: ${req.params.id} has deleted!`);
  res.status(201).send('product deleted!');
});

// errors middleware
app.use('*', middleNotFound);
app.use(middleError);

module.exports = {
  server: app,// exporting this for testing puposes
  start: (port) => {// exporting this for index.js
    const PORT = port || process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Listening on ${PORT}`));
  },
};