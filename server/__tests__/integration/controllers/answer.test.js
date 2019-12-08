import request from 'supertest';

import app from '../../../src/app';
import factory from '../../factories';
import truncate from '../../util/truncate';
import token from '../../util/authToken';

describe('Answer/Store', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to store', async () => {
    const { id: student_id } = await factory.create('Student');
    const { id: plan_id } = await factory.create('Plan');

    await factory.create('Registration', {
      student_id,
      plan_id,
    });

    const { id: help_order_id } = await factory.create('HelpOrder', {
      student_id,
    });

    const { answer } = await factory.attrs('Answer');

    const response = await request(app)
      .post(`/help-orders/${help_order_id}/answer`)
      .set('Authorization', token)
      .send({ answer });

    expect(response.body).toHaveProperty('id');
  });

  it('should not be able to store without authenticated', async () => {
    const { id: student_id } = await factory.create('Student');
    const { id: plan_id } = await factory.create('Plan');

    await factory.create('Registration', {
      student_id,
      plan_id,
    });

    const { id: help_order_id } = await factory.create('HelpOrder', {
      student_id,
    });

    const { answer } = await factory.attrs('Answer');

    const response = await request(app)
      .post(`/help-orders/${help_order_id}/answer`)
      .send({ answer });

    expect(response.status).toBe(401);
  });

  it('should not be able to store with invalid help order', async () => {
    const { answer } = await factory.attrs('Answer');

    const response = await request(app)
      .post(`/help-orders/0/answer`)
      .set('Authorization', token)
      .send({ answer });

    expect(response.status).toBe(400);
  });

  it('should not be able to store without an answer', async () => {
    const { id: student_id } = await factory.create('Student');
    const { id: plan_id } = await factory.create('Plan');

    await factory.create('Registration', {
      student_id,
      plan_id,
    });

    const { id: help_order_id } = await factory.create('HelpOrder', {
      student_id,
    });

    const response = await request(app)
      .post(`/help-orders/${help_order_id}/answer`)
      .set('Authorization', token)
      .send({});

    expect(response.status).toBe(400);
  });

  it('should not be able to store without an already answered help order', async () => {
    const { id: student_id } = await factory.create('Student');
    const { id: plan_id } = await factory.create('Plan');

    await factory.create('Registration', {
      student_id,
      plan_id,
    });

    const { id: help_order_id } = await factory.create('HelpOrder', {
      student_id,
    });

    const { answer } = await factory.attrs('Answer');

    await request(app)
      .post(`/help-orders/${help_order_id}/answer`)
      .set('Authorization', token)
      .send({ answer });

    const response = await request(app)
      .post(`/help-orders/${help_order_id}/answer`)
      .set('Authorization', token)
      .send({ answer });

    expect(response.status).toBe(400);
  });
});
