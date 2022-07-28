const request = require('supertest');
const { app, authHeader } = require('../app');

describe('GET: /api/test', () => {
  test('200: Provided the correct authorisation token, returns working message', () =>
    request(app)
      .get('/api/test')
      .set({ Authorization: authHeader })
      .expect(200)
      .then((result) => {
        expect(result.body).toEqual(
          expect.objectContaining({
            message: 'Working!',
          }),
        );
      }));
  test('203: When missing authorisation token, returns error: no authorization credentials set', () =>
    request(app)
      .get('/api/test')
      .expect(403)
      .then((result) => {
        expect(result.body).toEqual(
          expect.objectContaining({
            error: 'No authorization credentials set!',
          }),
        );
      }));
  test('203: When providing an incorrect auth token, returns error: Incorrect authorization credentials', () => {
    const fakeAuth = { Authorization: 'fakeToken' };
    return request(app)
      .get('/api/test')
      .set(fakeAuth)
      .expect(403)
      .then((result) => {
        expect(result.body).toEqual(
          expect.objectContaining({
            error: 'Incorrect authorization credentials!',
          }),
        );
      });
  });
});
