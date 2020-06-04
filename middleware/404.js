'use strict';

function notFoundHandler(req, res, next) {
  res.status(404);
  res.statusMessage = 'Resource Not Found';
  res.send('not Found');
}

module.exports = notFoundHandler;
