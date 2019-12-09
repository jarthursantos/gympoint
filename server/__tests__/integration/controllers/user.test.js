import request from 'supertest';

import app from '../../../src/app';
import factory from '../../factories';
import truncate from '../../util/truncate';
import generateToken from '../../util/authToken';

describe('Users', () => {
  beforeEach(async () => {
    await truncate();
  });

  afterAll(async done => {
    await truncate();
    done();
  });

  it('store: should be able to register', async () => {
    const user = await factory.attrs('User');

    const { token } = await generateToken();

    const response = await request(app)
      .post('/users')
      .set('Authorization', token)
      .send(user);

    expect(response.body).toHaveProperty('id');
  });

  it('store: should not be able to register without authenticate', async () => {
    const user = await factory.attrs('User');

    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.status).toBe(401);
  });

  it('store: should not be able to register with invalid authenticate token', async () => {
    const user = await factory.attrs('User');

    const response = await request(app)
      .post('/users')
      .set('Authorization', 'Bearer this dont is a valid token')
      .send(user);

    expect(response.status).toBe(401);
  });

  it('store: should not be able to register without name', async () => {
    const user = await factory.attrs('User');

    delete user.name;

    const { token } = await generateToken();

    const response = await request(app)
      .post('/users')
      .set('Authorization', token)
      .send(user);

    expect(response.status).toBe(400);
  });

  it('store: should not be able to register without email', async () => {
    const user = await factory.attrs('User');

    delete user.email;

    const { token } = await generateToken();

    const response = await request(app)
      .post('/users')
      .set('Authorization', token)
      .send(user);

    expect(response.status).toBe(400);
  });

  it('store: should not be able to register without password', async () => {
    const user = await factory.attrs('User');

    delete user.password;

    const { token } = await generateToken();

    const response = await request(app)
      .post('/users')
      .set('Authorization', token)
      .send(user);

    expect(response.status).toBe(400);
  });

  it('store: should not be able to register with duplicated email', async () => {
    const user = await factory.attrs('User');

    const { token } = await generateToken();

    await request(app)
      .post('/users')
      .set('Authorization', token)
      .send(user);

    const response = await request(app)
      .post('/users')
      .set('Authorization', token)
      .send(user);

    expect(response.status).toBe(400);
  });
});
