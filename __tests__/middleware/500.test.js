'use strict';

const errorHandler = require('../../middleware/500.js');
let req = {};
let res = { status: function (s) { this.status = s; return this; }, json: () => { } };
let err = 'erroooorr';
let next = jest.fn(); //function;

describe('web server', () => {
  it('should respond with 500', () => {
    errorHandler(err, req, res, next);
    expect(res.status).toBe(500);
  });
});