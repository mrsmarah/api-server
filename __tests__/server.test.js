'use strict';

const { server } = require('../lib/server');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server);

jest.spyOn(global.console, 'log');

let testObj1 = {
  'name': 'marah',
  'display_name': 'mj',
  'description': '401',
};
let idCategory = null;
let idProducts = null;

describe('categories.js', () => {

  it('1/ should respond 500 error /wrong', () => {
    return mockRequest
      .get('/wrong')
      .then(results => {
        expect(results.status).toBe(500);
      });
  });

  it('2/ should respond 200 get /categories', () => {
    return mockRequest
      .get('/categories')
      .then(results => {
        expect(results.status).toBe(200);
      });
  });

  it('3/ should respond 200 post /categories', () => {
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

  it('4/ should respond 200 get /categories/:id', () => {
    return mockRequest
      .get(`/categories/${idCategory}`)
      .then(results => {
        expect(results.status).toBe(200);
      });
  });

  it('5/ should respond 200 put /categories/:id', () => {
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

  it('6/ should respond 200 delete /categories/:id', () => {
    return mockRequest
      .delete(`/categories/${idCategory}`)
      .then(results => {
        expect(results.status).toBe(200);
      });
  });



  it('7/ should respond 200 post /products', () => {
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

    it('8/should respond 200 get /products', () => {
      return mockRequest
        .get('/products')
        .then(results => {
          expect(results.status).toBe(200);
        });
    });

    it('9/ should respond 200 get /products/:id', () => {
      return mockRequest
        .get(`/products/${idProducts}`)
        .then(results => {
          expect(results.status).toBe(200);
        });
    });

    it('10/ should respond 200 put /products/:id', () => {
      let updateTestObj = { name: 'test 4 updated', category: 'test cat', description: 'test test 4 updated', display_name: 'mmm' };
      return mockRequest
        .put(`/products/${idProducts}`)
        .send(updateTestObj)
        .then(results => {
          expect(results.status).toBe(200);
        });
    });


    it('11/should respond 200 delete /products/:id', () => {
      return mockRequest
        .delete(`/products/${idProducts}`)
        .then(results => {
          expect(results.status).toBe(200);
        });
    });

  });

});