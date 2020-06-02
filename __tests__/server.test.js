'use strict';
const { server } = require('../lib/server.js');
const supertest = require('supertest');
const mockRequest = supertest(server);

describe('Server', () => {
  it('1-should respond with 404 on an invalid route', () => {
    return mockRequest.get('/marah').then((results) => {
      expect(results.status).toBe(404);
    });
  });
  it('2-should respond with 201 on post /products', () => {
    return mockRequest.post('/products').then((results) => {
      expect(results.status).toBe(201);
    });
  });
  it('3-should respond with 200 on get /products', () => {
    return mockRequest.get('/products').then((results) => {
      expect(results.status).toBe(200);
    });
  });
  it('4-should respond with 200 on get /products/:id', () => {
    return mockRequest.get('/products/:id').then((results) => {
      expect(results.status).toBe(200);
    });
  });
  it('5-should respond with 201 on put /products/:id', () => {
    return mockRequest.put('/products/:id').then((results) => {
      expect(results.status).toBe(201);
    });
  });
  it('6-should respond with 200 on delete /products/:id', () => {
    return mockRequest.delete('/products/:id').then((results) => {
      expect(results.status).toBe(200);
    });
  });
  it('7-should respond with 201 on post /categories', () => {
    return mockRequest.post('/categories').then((results) => {
      expect(results.status).toBe(201);
    });
  });
  it('8-should respond with 200 on get /categories', () => {
    return mockRequest.get('/categories').then((results) => {
      expect(results.status).toBe(200);
    });
  });
  it('9-should respond with 200 on get /categories/:id', () => {
    return mockRequest.get('/categories/:id').then((results) => {
      expect(results.status).toBe(200);
    });
  });
  it('10-should respond with 201 on put /categories/:id', () => {
    return mockRequest.put('/categories/:id').then((results) => {
      expect(results.status).toBe(201);
    });
  });
  it('11-should respond with 200 on delete /categories/:id', () => {
    return mockRequest.delete('/categories/:id').then((results) => {
      expect(results.status).toBe(200);
    });
  });
});
  