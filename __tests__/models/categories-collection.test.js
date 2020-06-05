'use strict';

require('@code-fellows/supergoose');

const Model = require('../../lib/models/categories-collection');

let testObj = {
  'name': 'marah',
  'display_name': 'mj',
  'description': '401',
};
let updateTestObj ={
  'name': 'mmmmmm',
  'display_name': 'mj',
  'description': '401',
};
  
describe('server.js', () => {

  it('can get() all categories', () => {
   
    return Model.create(testObj)
      .then(() => {
        return Model.read()
          .then(data => {
            Object.keys(testObj).forEach(key => {
              expect(data[0][key]).toEqual(testObj[key]);
            });
          });
      });
  });

  it('can get() a category', () => {
    
    return Model.create(testObj)
      .then(postedData => {
        return Model.read(postedData._id)
          .then(data => {
            Object.keys(testObj).forEach(key => {
              expect(data[0][key]).toEqual(testObj[key]);
            });
          });
      });
  });

  it('can post() a category', () => {
   
    return Model.create(testObj)
      .then(data => {
        Object.keys(testObj).forEach(key => {
          expect(data[key]).toEqual(testObj[key]);
        });
      });
  });

  it('can put() a category', () => {
   
    return Model.create(testObj)
      .then(postedData => {
        return Model.update(postedData._id, updateTestObj)
          .then(data => {
            Object.keys(testObj).forEach(key => {
              expect(data[key]).toEqual(updateTestObj[key]);
            });
          });
      });
  });

  it('can delete() a category', () => {
    
    let testObj = {
      'name': 'none',
      'display_name': 'none',
      'description': 'none',
    };
      
    return Model.create(testObj)
      .then(postedData => {
        return Model.delete(postedData._id)
          .then(() => {
            return Model.read()
              .then(data => {
                data.forEach(element => {
                  Object.keys(testObj).forEach(key => {
                    expect(element[key]).not.toEqual(testObj[key]);
                  });
                });

              });
          });
      });
  });
});