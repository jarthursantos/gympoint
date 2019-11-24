import request from 'supertest';
import bcrypt from 'bcryptjs';
import createAdminUser from '../../util/createAdminUser';

import app from '../../../src/app';
import truncate from '../../util/truncate';

import User from '../../../src/app/models/User';

describe('Users', () => {
  beforeEach(async () => {
    await truncate();
    await createAdminUser();
  });

  it('should be able to register', async () => {
    const authResponse = await request(app)
      .post('/sessions')
      .send({
        email: 'admin@gympoint.com',
        password: 'password',
      });

    const { token } = authResponse.body;

    const response = await request(app)
      .post('/users')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Arthur Santos',
        email: 'arthur@gympoint.com',
        password: 'password',
      });

    expect(response.body).toHaveProperty('id');
  });

  it('should not be able to register without authenticate', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'Arthur Santos',
        email: 'arthur@gympoint.com',
        password: 'password',
      });

    expect(response.status).toBe(401);
  });

  it('should not be able to register without name', async () => {
    const authResponse = await request(app)
      .post('/sessions')
      .send({
        email: 'admin@gympoint.com',
        password: 'password',
      });

    const { token } = authResponse.body;

    const response = await request(app)
      .post('/users')
      .set('Authorization', `Bearer ${token}`)
      .send({
        email: 'arthur@gympoint.com',
        password: 'password',
      });

    expect(response.status).toBe(400);
  });

  it('should not be able to register without email', async () => {
    const authResponse = await request(app)
      .post('/sessions')
      .send({
        email: 'admin@gympoint.com',
        password: 'password',
      });

    const { token } = authResponse.body;

    const response = await request(app)
      .post('/users')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Arthur Santos',
        password: 'password',
      });

    expect(response.status).toBe(400);
  });

  it('should not be able to register without password', async () => {
    const authResponse = await request(app)
      .post('/sessions')
      .send({
        email: 'admin@gympoint.com',
        password: 'password',
      });

    const { token } = authResponse.body;

    const response = await request(app)
      .post('/users')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Arthur Santos',
        email: 'arthur@gympoint.com',
      });

    expect(response.status).toBe(400);
  });

  it('should not be able to register with duplicated email', async () => {
    const authResponse = await request(app)
      .post('/sessions')
      .send({
        email: 'admin@gympoint.com',
        password: 'password',
      });

    const { token } = authResponse.body;

    const user = {
      name: 'Arthur Santos',
      email: 'arthur@gympoint.com',
      password: 'password',
    };

    await request(app)
      .post('/users')
      .set('Authorization', `Bearer ${token}`)
      .send(user);

    const response = await request(app)
      .post('/users')
      .set('Authorization', `Bearer ${token}`)
      .send(user);

    expect(response.status).toBe(400);
  });

  it('should encrypt user password when new user created', async () => {
    const user = await User.create({
      name: 'Arthur Santos',
      email: 'arthur@gympoint.com',
      password: 'password',
    });

    const compareHash = await bcrypt.compare(user.password, user.password_hash);

    expect(compareHash).toBe(true);
  });
});
