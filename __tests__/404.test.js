'use strict';

const notFoundHandler = require('../middleware/404.js');
let req = {};
let res = { status: function (s) { this.status = s; return this; }, send: () => { } };
let next = jest.fn(); //function;

describe('web server', () => {
  it('should respond with 404', () => {
    notFoundHandler(req, res, next);
    expect(res.status).toBe(404);
  });
});