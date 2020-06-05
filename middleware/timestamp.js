'use strict';

/**
 * time stamp middleware  
 * @module timestamp
 * @param   req
 * @param   res
 * @param   next
 */

module.exports = (req, res, next) => {
  const currentDate = new Date().toLocaleDateString();
  req.requestTime = currentDate ; 

  next();
};
