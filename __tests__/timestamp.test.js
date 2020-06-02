const timeStampMiddleware = require('../middleware/timestamp.js');
describe('timestamp Middleware', () => {
  const req = {};
  const res = {};
  const next = jest.fn();
  
  it('returns the current date', () => {
    timeStampMiddleware(req, res, next);
    let currentDate = new Date().toLocaleDateString() ;
    expect(req.requestTime).toEqual(currentDate);
  });
  it('moves to the next middleware', () => {
    timeStampMiddleware(req, res, next);
    expect(next).toHaveBeenCalledWith();
  });
});
