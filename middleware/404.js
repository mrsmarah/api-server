'use strict';

function notFoundHandler(req, res, next) {
  res.status(404);
  res.statusMessage = 'Resource Not Found';
  res.json({ error: 'not Found' });
}

module.exports = notFoundHandler;
