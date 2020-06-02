'use strict';

module.exports = (req, res, next) => {
  const currentDate = new Date().toLocaleDateString();
  req.requestTime = currentDate ; 

  next();
};
