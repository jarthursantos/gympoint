import request from 'supertest';
import createAdminUser from '../../util/createAdminUser';

import app from '../../../src/app';
import truncate from '../../util/truncate';

describe('Plans', () => {
  beforeEach(async () => {
    await truncate();
    await createAdminUser();
  });

  const credentials = {
    email: 'admin@gympoint.com',
    password: 'password',
  };

  const defaultPlanData = {
    title: 'Start',
    duration: 1,
    price: 129,
  };

  it('should be able to register', async () => {
    const authResponse = await request(app)
      .post('/sessions')
      .send(credentials);

    const { token } = authResponse.body;

    const response = await request(app)
      .post('/plans')
      .set('Authorization', `Bearer ${token}`)
      .send(defaultPlanData);

    expect(response.body).toHaveProperty('id');
  });

  it('should not be able to register without authenticate', async () => {
    const response = await request(app)
      .post('/plans')
      .send(defaultPlanData);

    expect(response.status).toBe(401);
  });

  it('should not be able to register without title', async () => {
    const authResponse = await request(app)
      .post('/sessions')
      .send(credentials);

    const { token } = authResponse.body;

    const response = await request(app)
      .post('/plans')
      .set('Authorization', `Bearer ${token}`)
      .send({
        duration: 1,
        price: 129,
      });

    expect(response.status).toBe(400);
  });

  it('should not be able to register without duration', async () => {
    const authResponse = await request(app)
      .post('/sessions')
      .send(credentials);

    const { token } = authResponse.body;

    const response = await request(app)
      .post('/plans')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Start',
        price: 129,
      });

    expect(response.status).toBe(400);
  });

  it('should not be able to register with invalid duration', async () => {
    const authResponse = await request(app)
      .post('/sessions')
      .send(credentials);

    const { token } = authResponse.body;

    const response = await request(app)
      .post('/plans')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Start',
        duration: -1,
        price: 129,
      });

    expect(response.status).toBe(400);
  });

  it('should not be able to register without price', async () => {
    const authResponse = await request(app)
      .post('/sessions')
      .send(credentials);

    const { token } = authResponse.body;

    const response = await request(app)
      .post('/plans')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Start',
        duration: 1,
      });

    expect(response.status).toBe(400);
  });

  it('should not be able to register with invalid price', async () => {
    const authResponse = await request(app)
      .post('/sessions')
      .send(credentials);

    const { token } = authResponse.body;

    const response = await request(app)
      .post('/plans')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Start',
        duration: -1,
        price: 0,
      });

    expect(response.status).toBe(400);
  });

  it('should not be able to register with duplicated title', async () => {
    const authResponse = await request(app)
      .post('/sessions')
      .send(credentials);

    const { token } = authResponse.body;

    const plan = {
      name: 'Arthur Santos',
      email: 'arthur@gmail.com',
      age: 22,
      height: 1.75,
      weight: 83.3,
    };

    await request(app)
      .post('/plans')
      .set('Authorization', `Bearer ${token}`)
      .send(plan);

    const response = await request(app)
      .post('/plans')
      .set('Authorization', `Bearer ${token}`)
      .send(plan);

    expect(response.status).toBe(400);
  });

  it('should not be able to update invalid plan', async () => {
    const authResponse = await request(app)
      .post('/sessions')
      .send(credentials);

    const { token } = authResponse.body;

    const response = await request(app)
      .put(`/plans/0`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Gold',
      });

    expect(response.status).toBe(400);
  });

  it('should be able to update plan title', async () => {
    const authResponse = await request(app)
      .post('/sessions')
      .send(credentials);

    const { token } = authResponse.body;

    const planResponse = await request(app)
      .post('/plans')
      .set('Authorization', `Bearer ${token}`)
      .send(defaultPlanData);

    const { id } = planResponse.body;

    const response = await request(app)
      .put(`/plans/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Gold',
      });

    expect(response.body).toHaveProperty('title');
    expect(response.body.title).toBe('Gold');
  });

  it('should be able to update plan duration', async () => {
    const authResponse = await request(app)
      .post('/sessions')
      .send(credentials);

    const { token } = authResponse.body;

    const planResponse = await request(app)
      .post('/plans')
      .set('Authorization', `Bearer ${token}`)
      .send(defaultPlanData);

    const { id } = planResponse.body;

    const response = await request(app)
      .put(`/plans/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        duration: 3,
      });

    expect(response.body).toHaveProperty('duration');
    expect(response.body.duration).toBe(3);
  });

  it('should not be able to update plan with invalid duration', async () => {
    const authResponse = await request(app)
      .post('/sessions')
      .send(credentials);

    const { token } = authResponse.body;

    const planResponse = await request(app)
      .post('/plans')
      .set('Authorization', `Bearer ${token}`)
      .send(defaultPlanData);

    const { id } = planResponse.body;

    const response = await request(app)
      .put(`/plans/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        duration: 0,
      });

    expect(response.status).toBe(400);
  });

  it('should be able to update plan price', async () => {
    const authResponse = await request(app)
      .post('/sessions')
      .send(credentials);

    const { token } = authResponse.body;

    const planResponse = await request(app)
      .post('/plans')
      .set('Authorization', `Bearer ${token}`)
      .send(defaultPlanData);

    const { id } = planResponse.body;

    const response = await request(app)
      .put(`/plans/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        price: 109.0,
      });

    expect(response.body).toHaveProperty('price');
    expect(response.body.price).toBe(109.0);
  });

  it('should not be able to update plan with invalid price', async () => {
    const authResponse = await request(app)
      .post('/sessions')
      .send(credentials);

    const { token } = authResponse.body;

    const planResponse = await request(app)
      .post('/plans')
      .set('Authorization', `Bearer ${token}`)
      .send(defaultPlanData);

    const { id } = planResponse.body;

    const response = await request(app)
      .put(`/plans/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        price: 0.0,
      });

    expect(response.status).toBe(400);
  });

  it('should not be able to update student email with a already registered email', async () => {
    const authResponse = await request(app)
      .post('/sessions')
      .send(credentials);

    const { token } = authResponse.body;

    const planResponse = await request(app)
      .post('/plans')
      .set('Authorization', `Bearer ${token}`)
      .send(defaultPlanData);

    const { id } = planResponse.body;

    const response = await request(app)
      .put(`/plans/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        email: defaultPlanData.email,
      });

    expect(response.status).toBe(400);
  });
});
