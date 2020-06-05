'use strict';
const express = require('express');
const router = express.Router();
const getModel = require('../middleware/params.js');

router.param('model', getModel);

router.post('/:model', postHandler);
router.get('/:model', getAllHandler);
router.get('/:model/:_id', getOneHandler);
router.put('/:model/:_id', updateHandler);
router.delete('/:model/:_id', deleteHandler);


/**
 * Main router module which will get the models from the params to get,post,put,delete .
 * @module router
 */

/**
 * Get all function
 * @param   req
 * @param   res
 * @param   next
 * @function getAllhandler
 */

/** 
 *  * Get one by ID function
 * @param   req
 * @param   res
 * @param   next
 * @function getOneHandler
 */

/** 
 *  * Post function
 * @param   req
 * @param   res
 * @param   next
 * @function postHandler
 */

/** 
 *  * Update by ID function
 * @param   req
 * @param   res
 * @param   next
 * @function updateHandler
 */

/** 
 *  * Delete by ID function
 * @param   req
 * @param   res
 * @param   next
 * @function deleteHandler
 */




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

  
