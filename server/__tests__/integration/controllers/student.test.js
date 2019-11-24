import request from 'supertest';
import createAdminUser from '../../util/createAdminUser';

import app from '../../../src/app';
import truncate from '../../util/truncate';

describe('Students', () => {
  beforeEach(async () => {
    await truncate();
    await createAdminUser();
  });

  const credentials = {
    email: 'admin@gympoint.com',
    password: 'password',
  };

  it('should be able to register', async () => {
    const authResponse = await request(app)
      .post('/sessions')
      .send(credentials);

    const { token } = authResponse.body;

    const response = await request(app)
      .post('/students')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Arthur Santos',
        email: 'arthur@gmail.com',
        age: 22,
        height: 1.75,
        weight: 83.3,
      });

    expect(response.body).toHaveProperty('id');
  });

  it('should not be able to register without authenticate', async () => {
    const response = await request(app)
      .post('/students')
      .send({
        name: 'Arthur Santos',
        email: 'arthuro@gmail.com',
        age: 22,
        height: 1.75,
        weight: 83.3,
      });

    expect(response.status).toBe(401);
  });

  it('should not be able to register without name', async () => {
    const authResponse = await request(app)
      .post('/sessions')
      .send(credentials);

    const { token } = authResponse.body;

    const response = await request(app)
      .post('/students')
      .set('Authorization', `Bearer ${token}`)
      .send({
        email: 'arthur@gmail.com',
        age: 22,
        height: 1.75,
        weight: 83.3,
      });

    expect(response.status).toBe(400);
  });

  it('should not be able to register without email', async () => {
    const authResponse = await request(app)
      .post('/sessions')
      .send(credentials);

    const { token } = authResponse.body;

    const response = await request(app)
      .post('/students')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Arthur Santos',
        age: 22,
        height: 1.75,
        weight: 83.3,
      });

    expect(response.status).toBe(400);
  });

  it('should not be able to register without age', async () => {
    const authResponse = await request(app)
      .post('/sessions')
      .send(credentials);

    const { token } = authResponse.body;

    const response = await request(app)
      .post('/students')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Arthur Santos',
        email: 'arthur@gmail.com',
        height: 1.75,
        weight: 83.3,
      });

    expect(response.status).toBe(400);
  });

  it('should not be able to register without height', async () => {
    const authResponse = await request(app)
      .post('/sessions')
      .send(credentials);

    const { token } = authResponse.body;

    const response = await request(app)
      .post('/students')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Arthur Santos',
        email: 'arthur@gmail.com',
        age: 22,
        weight: 83.3,
      });

    expect(response.status).toBe(400);
  });

  it('should not be able to register without weight', async () => {
    const authResponse = await request(app)
      .post('/sessions')
      .send(credentials);

    const { token } = authResponse.body;

    const response = await request(app)
      .post('/students')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Arthur Santos',
        email: 'arthur@gmail.com',
        age: 22,
        height: 1.75,
      });

    expect(response.status).toBe(400);
  });

  it('should not be able to register with duplicated email', async () => {
    const authResponse = await request(app)
      .post('/sessions')
      .send(credentials);

    const { token } = authResponse.body;

    const user = {
      name: 'Arthur Santos',
      email: 'arthur@gmail.com',
      age: 22,
      height: 1.75,
      weight: 83.3,
    };

    await request(app)
      .post('/students')
      .set('Authorization', `Bearer ${token}`)
      .send(user);

    const response = await request(app)
      .post('/students')
      .set('Authorization', `Bearer ${token}`)
      .send(user);

    expect(response.status).toBe(400);
  });
});
