'use strict';

module.exports = (req, res, next) => {
  var currentDate = new Date();
  var date = currentDate.getDate();
  var month = currentDate.getMonth(); 
  var year = currentDate.getFullYear();
  var monthDateYear  = date + "/" + (month+1) + "/" + year;
  req.requestTime = monthDateYear ;  

  next();
};
