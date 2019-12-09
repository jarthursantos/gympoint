import request from 'supertest';

import app from '../../../src/app';
import factory from '../../factories';
import truncate from '../../util/truncate';

describe('Session', () => {
  beforeEach(async () => {
    await truncate();
  });

  afterAll(async done => {
    await truncate();
    done();
  });

  it('store: should be able to authenticate the credentials', async () => {
    const { email, password } = await factory.create('User');

    const response = await request(app)
      .post('/sessions')
      .send({ email, password });

    expect(response.body).toHaveProperty('token');
  });

  it('store: should not be able to authenticate credentials without email', async () => {
    const { password } = await factory.create('User');

    const response = await request(app)
      .post('/sessions')
      .send({ password });

    expect(response.status).toBe(400);
  });

  it('store: should not be able to authenticate credentials without password', async () => {
    const { email } = await factory.create('User');

    const response = await request(app)
      .post('/sessions')
      .send({ email });

    expect(response.status).toBe(400);
  });

  it('store: should not be able to authenticate invalid credentials email', async () => {
    const user = await factory.attrs('User');

    const response = await request(app)
      .post('/sessions')
      .send(user);

    expect(response.status).toBe(400);

    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('user not found');
  });

  it('store: should not be able to authenticate invalid credentials password', async () => {
    const { email, password } = await factory.create('User');

    const response = await request(app)
      .post('/sessions')
      .send({
        email,
        password: `${password}0`,
      });

    expect(response.status).toBe(400);

    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('invalid password');
  });
});
