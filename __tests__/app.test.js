const request = require('supertest');
const parsePrometheusTextFormat = require('parse-prometheus-text-format');
const { app, authHeader } = require('../app');

/*
Test suite using Jest with Supertest.
*/
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

describe('GET: /api/metrics', () => {
  test('200: Provided the correct authorisation token, serves all default available Prometheus-format metrics', () =>
    request(app)
      .get('/api/metrics')
      .set({ Authorization: authHeader })
      .expect(200)
      .then((result) => {
        const parsed = parsePrometheusTextFormat(result.text);
        expect(parsed.length).toEqual(33);
        parsed.forEach((metric) => {
          expect(metric).toEqual(
            expect.objectContaining({
              name: expect.any(String),
              help: expect.any(String),
              type: expect.any(String),
              metrics: expect.any(Array),
            }),
          );
        });
      }));
  test('203: When missing authorisation token, returns error: no authorization credentials set', () =>
    request(app)
      .get('/api/metrics')
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
      .get('/api/metrics')
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

describe('GET: /incorrectPaths', () => {
  test('404: when requesting an incorrect path with correct auth token, returns msg: Path not found', () =>
    request(app)
      .get('/api/fakePath')
      .set({ Authorization: authHeader })
      .expect(404)
      .then((result) => {
        expect(result.body).toEqual(
          expect.objectContaining({
            msg: 'Path not found',
          }),
        );
      }));
  test('203: When missing authorisation token, returns error: no authorization credentials set', () =>
    request(app)
      .get('/api/fakePath')
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
      .get('/api/fakePath')
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
