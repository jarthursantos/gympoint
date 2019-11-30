import request from 'supertest';

import app from '../../../src/app';
import factory from '../../factories';
import truncate from '../../util/truncate';
import token from '../../util/authToken';

describe('Users', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to register', async () => {
    const user = await factory.attrs('User');

    const response = await request(app)
      .post('/users')
      .set('Authorization', token)
      .send(user);

    expect(response.body).toHaveProperty('id');
  });

  it('should not be able to register without authenticate', async () => {
    const user = await factory.attrs('User');

    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.status).toBe(401);
  });

  it('should not be able to register without name', async () => {
    const user = await factory.attrs('User');

    delete user.name;

    const response = await request(app)
      .post('/users')
      .set('Authorization', token)
      .send(user);

    expect(response.status).toBe(400);
  });

  it('should not be able to register without email', async () => {
    const user = await factory.attrs('User');

    delete user.email;

    const response = await request(app)
      .post('/users')
      .set('Authorization', token)
      .send(user);

    expect(response.status).toBe(400);
  });

  it('should not be able to register without password', async () => {
    const user = await factory.attrs('User');

    delete user.password;

    const response = await request(app)
      .post('/users')
      .set('Authorization', token)
      .send(user);

    expect(response.status).toBe(400);
  });

  it('should not be able to register with duplicated email', async () => {
    const user = await factory.attrs('User');

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
