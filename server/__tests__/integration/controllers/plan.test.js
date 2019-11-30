import request from 'supertest';

import app from '../../../src/app';
import factory from '../../factories';
import truncate from '../../util/truncate';
import token from '../../util/authToken';

describe('Plans/Index', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to show a list of plans', async () => {
    const response = await request(app)
      .get(`/plans`)
      .set('Authorization', token);

    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should not be able to show a list of plans without autentication', async () => {
    const response = await request(app).get(`/plans`);

    expect(response.status).toBe(401);
  });
});

describe('Plans/Store', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to register', async () => {
    const plan = await factory.attrs('Plan');
    const response = await request(app)
      .post('/plans')
      .set('Authorization', token)
      .send(plan);

    expect(response.body).toHaveProperty('id');
  });

  it('should not be able to register without authenticate', async () => {
    const plan = await factory.attrs('Plan');

    const response = await request(app)
      .post('/plans')
      .send(plan);

    expect(response.status).toBe(401);
  });

  it('should not be able to register without title', async () => {
    const plan = await factory.attrs('Plan');
    delete plan.title;

    const response = await request(app)
      .post('/plans')
      .set('Authorization', token)
      .send(plan);

    expect(response.status).toBe(400);
  });

  it('should not be able to register without duration', async () => {
    const plan = await factory.attrs('Plan');
    delete plan.duration;

    const response = await request(app)
      .post('/plans')
      .set('Authorization', token)
      .send(plan);

    expect(response.status).toBe(400);
  });

  it('should not be able to register with invalid duration', async () => {
    const plan = await factory.attrs('Plan', { duration: 0 });

    const response = await request(app)
      .post('/plans')
      .set('Authorization', token)
      .send(plan);

    expect(response.status).toBe(400);
  });

  it('should not be able to register without price', async () => {
    const plan = await factory.attrs('Plan');
    delete plan.price;

    const response = await request(app)
      .post('/plans')
      .set('Authorization', token)
      .send(plan);

    expect(response.status).toBe(400);
  });

  it('should not be able to register with invalid price', async () => {
    const plan = await factory.attrs('Plan', { price: 0 });

    const response = await request(app)
      .post('/plans')
      .set('Authorization', token)
      .send(plan);

    expect(response.status).toBe(400);
  });

  it('should not be able to register with duplicated title', async () => {
    const plan = await factory.attrs('Plan');

    await request(app)
      .post('/plans')
      .set('Authorization', token)
      .send(plan);

    const response = await request(app)
      .post('/plans')
      .set('Authorization', token)
      .send(plan);

    expect(response.status).toBe(400);
  });
});

describe('Plans/Update', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to update', async () => {
    const { id } = await factory.create('Plan');

    const response = await request(app)
      .put(`/plans/${id}`)
      .set('Authorization', token)
      .send({
        title: 'Gold',
      });

    expect(response.body).toHaveProperty('id');
  });

  it('should not be able to update without authenticate', async () => {
    const { id } = await factory.create('Plan');

    const response = await request(app)
      .post(`/plans/${id}`)
      .send({
        title: 'Gold',
        duration: 3,
        price: 109,
      });

    expect(response.status).toBe(401);
  });

  it('should not be able to update invalid plan', async () => {
    const response = await request(app)
      .put(`/plans/0`)
      .set('Authorization', token)
      .send({
        title: 'Gold',
      });

    expect(response.status).toBe(400);
  });

  it('should be able to update plan title', async () => {
    const { id } = await factory.create('Plan');

    const response = await request(app)
      .put(`/plans/${id}`)
      .set('Authorization', token)
      .send({
        title: 'Gold',
      });

    expect(response.body).toHaveProperty('title');
    expect(response.body.title).toBe('Gold');
  });

  it('should not be able to update plan title with a already registered title', async () => {
    const { id, title } = await factory.create('Plan');

    const response = await request(app)
      .put(`/plans/${id}`)
      .set('Authorization', token)
      .send({ title });

    expect(response.status).toBe(400);
  });

  it('should be able to update plan duration', async () => {
    const { id } = await factory.create('Plan');

    const response = await request(app)
      .put(`/plans/${id}`)
      .set('Authorization', token)
      .send({ duration: 3 });

    expect(response.body).toHaveProperty('duration');
    expect(response.body.duration).toBe(3);
  });

  it('should not be able to update plan with invalid duration', async () => {
    const { id } = await factory.create('Plan');

    const response = await request(app)
      .put(`/plans/${id}`)
      .set('Authorization', token)
      .send({ duration: 0 });

    expect(response.status).toBe(400);
  });

  it('should be able to update plan price', async () => {
    const { id } = await factory.create('Plan');

    const response = await request(app)
      .put(`/plans/${id}`)
      .set('Authorization', token)
      .send({ price: 109.0 });

    expect(response.body).toHaveProperty('price');
    expect(response.body.price).toBe(109.0);
  });

  it('should not be able to update plan with invalid price', async () => {
    const { id } = await factory.create('Plan');

    const response = await request(app)
      .put(`/plans/${id}`)
      .set('Authorization', token)
      .send({ price: 0.0 });

    expect(response.status).toBe(400);
  });
});

describe('Plans/Destroy', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to delete specific plan', async () => {
    const { id } = await factory.create('Plan');

    const response = await request(app)
      .delete(`/plans/${id}`)
      .set('Authorization', token);

    expect(response.status).toBe(200);
  });

  it('should not be able to delete a plan without authenticate', async () => {
    const { id } = await factory.create('Plan');

    const response = await request(app).delete(`/plans/${id}`);

    expect(response.status).toBe(401);
  });

  it('should not be able to delete a invalid plan', async () => {
    const response = await request(app)
      .delete('/plans/0')
      .set('Authorization', token);

    expect(response.status).toBe(400);
  });
});
