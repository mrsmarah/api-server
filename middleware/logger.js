'use strict';

/**
 * logger middleware to log  the request method, path, timestamp   
 * @module logger
 * @param   req
 * @param   res
 * @param   next
 */

module.exports = (req, res, next) => {
  console.log('Request', req.method, req.path , req.requestTime);
  next();
};
