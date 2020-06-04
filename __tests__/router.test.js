'use strict';

const express = require('express');
const server = express();

const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server);

const route = require('../routes/main-router.js');
server.use(express.urlencoded({ extended: false }));
server.use(express.json());
server.use(route);

let testObj1 = {
  'name': 'marah',
  'display_name': 'mj',
  'description': '401',
};
let idCategory = null;
let idProducts = null;

describe('categories.js', () => {

  it('1/ should respond error /wrong', () => {
    return mockRequest
      .get('/wrong')
      .then(results => {
        expect(results.status).toBe(500);
      });
  });

  it('2/ should respond properly get /categories', () => {
    return mockRequest
      .get('/categories')
      .then(results => {
        expect(results.status).toBe(200);
      });
  });

  it('3/ should post properly /categories', () => {
    // let testObj = { 'name': 'test name 1', 'description': 'test test 1 ' };
    return mockRequest
      .post('/categories')
      .send(testObj1)
      .then(results => {
        idCategory = results.body._id;
        expect(results.status).toBe(200);
        Object.keys(testObj1).forEach(key => {
          expect(results.body[key]).toEqual(testObj1[key]);
        });
      });
  });

  it('4/ should respond properly /categories/:id', () => {
    return mockRequest
      .get(`/categories/${idCategory}`)
      .then(results => {
        expect(results.status).toBe(200);
      });
  });

  it('5/ should PUT properly /categories/:id', () => {
    // let testObj = { 'name': 'test name 1 updated', description: 'test test 1 updated ' };
    return mockRequest
      .put(`/categories/${idCategory}`, testObj1)
      .send(testObj1)
      .then(results => {
        expect(results.status).toBe(200);
        Object.keys(testObj1).forEach(key => {
          expect(results.body[key]).toEqual(testObj1[key]);
        });
      });
  });

  it('6/ should DELETE properly /categories/:id', () => {
    return mockRequest
      .delete(`/categories/${idCategory}`)
      .then(results => {
        expect(results.status).toBe(200);
      });
  });



  it('7/ should post properly /products', () => {
    let testObj = { name: 'test 1', category: 'test cat', description: 'test test 1 ', display_name: 'mmm' };
    return mockRequest
      .post('/products')
      .send(testObj)
      .then(results => {
        idProducts = results.body._id;
        expect(results.status).toBe(200);
        Object.keys(testObj).forEach(key => {
          expect(results.body[key]).toEqual(testObj[key]);
        });
      });
  });

  describe('products.js', () => {

    it('8/ should respond properly /products', () => {
      return mockRequest
        .get('/products')
        .then(results => {
          expect(results.status).toBe(200);
        });
    });

    it('9/ should respond properly to get /products/:id', () => {
      return mockRequest
        .get(`/products/${idProducts}`)
        .then(results => {
          expect(results.status).toBe(200);
        });
    });

    it('10/ should PUT properly /products/:id', () => {
      let updateTestObj = { name: 'test 4 updated', category: 'test cat', description: 'test test 4 updated', display_name: 'mmm' };
      return mockRequest
        .put(`/products/${idProducts}`)
        .send(updateTestObj)
        .then(results => {
          expect(results.status).toBe(200);
        });
    });


    it('11/ should DELETE properly /products/:id', () => {
      return mockRequest
        .delete(`/products/${idProducts}`)
        .then(results => {
          expect(results.status).toBe(200);
        });
    });

  });

});