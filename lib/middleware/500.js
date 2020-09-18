'use strict';

/**
 * 500 server errors middleware 
 * @module serverError
 * @param   req
 * @param   res
 * @param   next
 */

function errorHandler(err, req, res, next) {
  res.status(500);
  res.statusMessage = 'Server Error :(';
  res.json({ error: err });
}

module.exports = errorHandler;
