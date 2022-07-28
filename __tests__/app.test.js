const request = require('supertest');
const { app } = require('../app');

describe('GET: /api', () => {
  test('200: Returns with working message', () =>
    request(app)
      .get('/api/test')
      .expect(200)
      .then((result) => {
        expect(result.body).toEqual(
          expect.objectContaining({
            message: 'Working!',
          }),
        );
      }));
});
