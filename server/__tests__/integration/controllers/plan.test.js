import request from 'supertest';

import app from '../../../src/app';
import factory from '../../factories';
import truncate from '../../util/truncate';
import generateToken from '../../util/authToken';

describe('Plans', () => {
  beforeEach(async () => {
    await truncate();
  });

  afterAll(async done => {
    await truncate();
    done();
  });

  it('index: should be able to show a list of plans', async () => {
    const { token } = await generateToken();

    const response = await request(app)
      .get(`/plans`)
      .set('Authorization', token);

    expect(Array.isArray(response.body)).toBe(true);
  });

  it('index: should not be able to show a list of plans without autentication', async () => {
    const response = await request(app).get(`/plans`);

    expect(response.status).toBe(401);
  });

  it('store: should be able to register', async () => {
    const { id: admin_id, token } = await generateToken();

    const plan = await factory.attrs('Plan', {
      created_by: admin_id,
    });

    const response = await request(app)
      .post('/plans')
      .set('Authorization', token)
      .send(plan);

    expect(response.body).toHaveProperty('id');
  });

  it('store: should not be able to register without authenticate', async () => {
    const { id: admin_id } = await generateToken();

    const plan = await factory.attrs('Plan', {
      created_by: admin_id,
    });

    const response = await request(app)
      .post('/plans')
      .send(plan);

    expect(response.status).toBe(401);
  });

  it('store: should not be able to register without title', async () => {
    const { id: admin_id, token } = await generateToken();

    const plan = await factory.attrs('Plan', {
      created_by: admin_id,
    });
    delete plan.title;

    const response = await request(app)
      .post('/plans')
      .set('Authorization', token)
      .send(plan);

    expect(response.status).toBe(400);
  });

  it('store: should not be able to register without duration', async () => {
    const { id: admin_id, token } = await generateToken();

    const plan = await factory.attrs('Plan', {
      created_by: admin_id,
    });
    delete plan.duration;

    const response = await request(app)
      .post('/plans')
      .set('Authorization', token)
      .send(plan);

    expect(response.status).toBe(400);
  });

  it('store: should not be able to register with invalid duration', async () => {
    const { id: admin_id, token } = await generateToken();

    const plan = await factory.attrs('Plan', {
      duration: 0,
      created_by: admin_id,
    });

    const response = await request(app)
      .post('/plans')
      .set('Authorization', token)
      .send(plan);

    expect(response.status).toBe(400);
  });

  it('store: should not be able to register without price', async () => {
    const { id: admin_id, token } = await generateToken();

    const plan = await factory.attrs('Plan', {
      created_by: admin_id,
    });

    delete plan.price;

    const response = await request(app)
      .post('/plans')
      .set('Authorization', token)
      .send(plan);

    expect(response.status).toBe(400);
  });

  it('store: should not be able to register with invalid price', async () => {
    const { id: admin_id, token } = await generateToken();

    const plan = await factory.attrs('Plan', {
      price: 0,
      created_by: admin_id,
    });

    const response = await request(app)
      .post('/plans')
      .set('Authorization', token)
      .send(plan);

    expect(response.status).toBe(400);
  });

  it('store: should not be able to register with duplicated title', async () => {
    const { id: admin_id, token } = await generateToken();

    const plan = await factory.attrs('Plan', {
      created_by: admin_id,
    });

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

  it('update: should be able to update', async () => {
    const { id: admin_id, token } = await generateToken();

    const { id } = await factory.create('Plan', {
      created_by: admin_id,
    });

    const response = await request(app)
      .put(`/plans/${id}`)
      .set('Authorization', token)
      .send({
        title: 'Gold',
      });

    expect(response.body).toHaveProperty('id');
  });

  it('update: should not be able to update without authenticate', async () => {
    const { id: admin_id } = await generateToken();

    const { id } = await factory.create('Plan', {
      created_by: admin_id,
    });

    const response = await request(app)
      .post(`/plans/${id}`)
      .send({
        title: 'Gold',
        duration: 3,
        price: 109,
      });

    expect(response.status).toBe(401);
  });

  it('update: should not be able to update invalid plan', async () => {
    const { token } = await generateToken();

    const response = await request(app)
      .put(`/plans/0`)
      .set('Authorization', token)
      .send({
        title: 'Gold',
      });

    expect(response.status).toBe(400);
  });

  it('update: should be able to update plan title', async () => {
    const { id: admin_id, token } = await generateToken();

    const { id } = await factory.create('Plan', {
      created_by: admin_id,
    });

    const response = await request(app)
      .put(`/plans/${id}`)
      .set('Authorization', token)
      .send({
        title: 'Gold',
      });

    expect(response.body).toHaveProperty('title');
    expect(response.body.title).toBe('Gold');
  });

  it('update: should not be able to update plan title with a already registered title', async () => {
    const { id: admin_id, token } = await generateToken();

    const { id, title } = await factory.create('Plan', {
      created_by: admin_id,
    });

    await factory.create('Plan', { title: `${title} 2`, created_by: admin_id });

    const response = await request(app)
      .put(`/plans/${id}`)
      .set('Authorization', token)
      .send({ title: `${title} 2` });

    expect(response.status).toBe(400);
  });

  it('update: should be able to request plan update with the same title', async () => {
    const { id: admin_id, token } = await generateToken();

    const { id, title } = await factory.create('Plan', {
      created_by: admin_id,
    });

    const response = await request(app)
      .put(`/plans/${id}`)
      .set('Authorization', token)
      .send({ title });

    expect(response.status).toBe(200);
  });

  it('update: should be able to update plan duration', async () => {
    const { id: admin_id, token } = await generateToken();

    const { id } = await factory.create('Plan', {
      created_by: admin_id,
    });

    const response = await request(app)
      .put(`/plans/${id}`)
      .set('Authorization', token)
      .send({ duration: 3 });

    expect(response.body).toHaveProperty('duration');
    expect(response.body.duration).toBe(3);
  });

  it('update: should not be able to update plan with invalid duration', async () => {
    const { id: admin_id, token } = await generateToken();

    const { id } = await factory.create('Plan', {
      created_by: admin_id,
    });

    const response = await request(app)
      .put(`/plans/${id}`)
      .set('Authorization', token)
      .send({ duration: 0 });

    expect(response.status).toBe(400);
  });

  it('update: should be able to update plan price', async () => {
    const { id: admin_id, token } = await generateToken();

    const { id } = await factory.create('Plan', {
      created_by: admin_id,
    });

    const response = await request(app)
      .put(`/plans/${id}`)
      .set('Authorization', token)
      .send({ price: 109.0 });

    expect(response.body).toHaveProperty('price');
    expect(response.body.price).toBe(109.0);
  });

  it('update: should not be able to update plan with invalid price', async () => {
    const { id: admin_id, token } = await generateToken();

    const { id } = await factory.create('Plan', {
      created_by: admin_id,
    });

    const response = await request(app)
      .put(`/plans/${id}`)
      .set('Authorization', token)
      .send({ price: 0.0 });

    expect(response.status).toBe(400);
  });

  it('destroy: should be able to delete specific plan', async () => {
    const { id: admin_id, token } = await generateToken();

    const { id } = await factory.create('Plan', {
      created_by: admin_id,
    });

    const response = await request(app)
      .delete(`/plans/${id}`)
      .set('Authorization', token);

    expect(response.status).toBe(200);
  });

  it('destroy: should not be able to delete a plan without authenticate', async () => {
    const { id: admin_id } = await generateToken();

    const { id } = await factory.create('Plan', {
      created_by: admin_id,
    });

    const response = await request(app).delete(`/plans/${id}`);

    expect(response.status).toBe(401);
  });

  it('destroy: should not be able to delete a invalid plan', async () => {
    const { token } = await generateToken();

    const response = await request(app)
      .delete('/plans/0')
      .set('Authorization', token);

    expect(response.status).toBe(400);
  });
});
