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

  const defaultUserData = {
    name: 'Arthur Santos',
    email: 'arthur@gmail.com',
    age: 22,
    height: 1.75,
    weight: 83.3,
  };

  it('should be able to register', async () => {
    const authResponse = await request(app)
      .post('/sessions')
      .send(credentials);

    const { token } = authResponse.body;

    const response = await request(app)
      .post('/students')
      .set('Authorization', `Bearer ${token}`)
      .send(defaultUserData);

    expect(response.body).toHaveProperty('id');
  });

  it('should not be able to register without authenticate', async () => {
    const response = await request(app)
      .post('/students')
      .send(defaultUserData);

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

  it('should not be able to register with invalid age', async () => {
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
        age: 0,
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

  it('should not be able to register with invalid height', async () => {
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
        height: 0,
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

  it('should not be able to register with invalid weight', async () => {
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
        weight: 0,
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

  it('should not be able to update invalid student', async () => {
    const authResponse = await request(app)
      .post('/sessions')
      .send(credentials);

    const { token } = authResponse.body;

    const response = await request(app)
      .put(`/students/0`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'José Silva',
      });

    expect(response.status).toBe(400);
  });

  it('should be able to update student name', async () => {
    const authResponse = await request(app)
      .post('/sessions')
      .send(credentials);

    const { token } = authResponse.body;

    const studentResponse = await request(app)
      .post('/students')
      .set('Authorization', `Bearer ${token}`)
      .send(defaultUserData);

    const { id } = studentResponse.body;

    const response = await request(app)
      .put(`/students/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'José Silva',
      });

    expect(response.body).toHaveProperty('name');
    expect(response.body.name).toBe('José Silva');
  });

  it('should be able to update student email', async () => {
    const authResponse = await request(app)
      .post('/sessions')
      .send(credentials);

    const { token } = authResponse.body;

    const studentResponse = await request(app)
      .post('/students')
      .set('Authorization', `Bearer ${token}`)
      .send(defaultUserData);

    const { id } = studentResponse.body;

    const response = await request(app)
      .put(`/students/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        email: 'silva@gmail.com',
      });

    expect(response.body).toHaveProperty('email');
    expect(response.body.email).toBe('silva@gmail.com');
  });

  it('should be able to update student age', async () => {
    const authResponse = await request(app)
      .post('/sessions')
      .send(credentials);

    const { token } = authResponse.body;

    const studentResponse = await request(app)
      .post('/students')
      .set('Authorization', `Bearer ${token}`)
      .send(defaultUserData);

    const { id } = studentResponse.body;

    const response = await request(app)
      .put(`/students/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        age: 23,
      });

    expect(response.body).toHaveProperty('age');
    expect(response.body.age).toBe(23);
  });

  it('should not be able to update student with invalid age', async () => {
    const authResponse = await request(app)
      .post('/sessions')
      .send(credentials);

    const { token } = authResponse.body;

    const studentResponse = await request(app)
      .post('/students')
      .set('Authorization', `Bearer ${token}`)
      .send(defaultUserData);

    const { id } = studentResponse.body;

    const response = await request(app)
      .put(`/students/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        age: 0,
      });

    expect(response.status).toBe(400);
  });

  it('should be able to update student height', async () => {
    const authResponse = await request(app)
      .post('/sessions')
      .send(credentials);

    const { token } = authResponse.body;

    const studentResponse = await request(app)
      .post('/students')
      .set('Authorization', `Bearer ${token}`)
      .send(defaultUserData);

    const { id } = studentResponse.body;

    const response = await request(app)
      .put(`/students/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        height: 1.7,
      });

    expect(response.body).toHaveProperty('height');
    expect(response.body.height).toBe(1.7);
  });

  it('should not be able to update student with invalid height', async () => {
    const authResponse = await request(app)
      .post('/sessions')
      .send(credentials);

    const { token } = authResponse.body;

    const studentResponse = await request(app)
      .post('/students')
      .set('Authorization', `Bearer ${token}`)
      .send(defaultUserData);

    const { id } = studentResponse.body;

    const response = await request(app)
      .put(`/students/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        height: 0,
      });

    expect(response.status).toBe(400);
  });

  it('should be able to update student weight', async () => {
    const authResponse = await request(app)
      .post('/sessions')
      .send(credentials);

    const { token } = authResponse.body;

    const studentResponse = await request(app)
      .post('/students')
      .set('Authorization', `Bearer ${token}`)
      .send(defaultUserData);

    const { id } = studentResponse.body;

    const response = await request(app)
      .put(`/students/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        weight: 80.0,
      });

    expect(response.body).toHaveProperty('weight');
    expect(response.body.weight).toBe(80.0);
  });

  it('should not be able to update student with invalid weight', async () => {
    const authResponse = await request(app)
      .post('/sessions')
      .send(credentials);

    const { token } = authResponse.body;

    const studentResponse = await request(app)
      .post('/students')
      .set('Authorization', `Bearer ${token}`)
      .send(defaultUserData);

    const { id } = studentResponse.body;

    const response = await request(app)
      .put(`/students/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        weight: 0,
      });

    expect(response.status).toBe(400);
  });

  it('should not be able to update student email with a already registered email', async () => {
    const authResponse = await request(app)
      .post('/sessions')
      .send(credentials);

    const { token } = authResponse.body;

    const studentResponse = await request(app)
      .post('/students')
      .set('Authorization', `Bearer ${token}`)
      .send(defaultUserData);

    const { id } = studentResponse.body;

    const response = await request(app)
      .put(`/students/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        email: defaultUserData.email,
      });

    expect(response.status).toBe(400);
  });
});
