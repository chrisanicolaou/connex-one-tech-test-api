const request = require('supertest');
const { app, authHeader } = require('../app');

describe('GET: /api/time', () => {
  test('200: Provided the correct authorisation token, returns correct current system time in Epoch seconds', () => {
    jest.useFakeTimers().setSystemTime(new Date('2022-07-29'));
    return request(app)
      .get('/api/time')
      .set({ Authorization: authHeader })
      .expect(200)
      .then((result) => {
        expect(result.body).toEqual(
          expect.objectContaining({
            epoch: 1659052800,
          }),
        );
      });
  });
  test('203: When missing authorisation token, returns error: no authorization credentials set', () =>
    request(app)
      .get('/api/time')
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
      .get('/api/time')
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
