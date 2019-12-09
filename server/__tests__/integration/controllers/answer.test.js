import request from 'supertest';

import app from '../../../src/app';
import factory from '../../factories';
import truncate from '../../util/truncate';
import generateToken from '../../util/authToken';

describe('Answer', () => {
  beforeEach(async () => {
    await truncate();
  });

  afterAll(async done => {
    await truncate();
    done();
  });

  it('store: should be able to store', async () => {
    const { id: admin_id, token } = await generateToken();

    const { id: student_id } = await factory.create('Student', {
      created_by: admin_id,
    });
    const { id: plan_id } = await factory.create('Plan', {
      created_by: admin_id,
    });

    await factory.create('Registration', {
      student_id,
      plan_id,
    });

    const { id: help_order_id } = await factory.create('HelpOrder', {
      student_id,
    });

    const { answer } = await factory.attrs('Answer', {
      replier_by: admin_id,
    });

    const response = await request(app)
      .post(`/help-orders/${help_order_id}/answer`)
      .set('Authorization', token)
      .send({ answer });

    expect(response.body).toHaveProperty('id');
  });

  it('store: should not be able to store without authenticated', async () => {
    const { id: admin_id } = await generateToken();

    const { id: student_id } = await factory.create('Student', {
      created_by: admin_id,
    });
    const { id: plan_id } = await factory.create('Plan', {
      created_by: admin_id,
    });

    await factory.create('Registration', {
      student_id,
      plan_id,
    });

    const { id: help_order_id } = await factory.create('HelpOrder', {
      student_id,
    });

    const { answer } = await factory.attrs('Answer', {
      replier_by: admin_id,
    });

    const response = await request(app)
      .post(`/help-orders/${help_order_id}/answer`)
      .send({ answer });

    expect(response.status).toBe(401);
  });

  it('store: should not be able to store with invalid help order', async () => {
    const { id: admin_id, token } = await generateToken();

    const { answer } = await factory.attrs('Answer', {
      replier_by: admin_id,
    });

    const response = await request(app)
      .post(`/help-orders/0/answer`)
      .set('Authorization', token)
      .send({ answer });

    expect(response.status).toBe(400);
  });

  it('store: should not be able to store without an answer', async () => {
    const { id: admin_id, token } = await generateToken();

    const { id: student_id } = await factory.create('Student', {
      created_by: admin_id,
    });
    const { id: plan_id } = await factory.create('Plan', {
      created_by: admin_id,
    });

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

  it('store: should not be able to store without an already answered help order', async () => {
    const { id: admin_id, token } = await generateToken();

    const { id: student_id } = await factory.create('Student', {
      created_by: admin_id,
    });
    const { id: plan_id } = await factory.create('Plan', {
      created_by: admin_id,
    });

    await factory.create('Registration', {
      student_id,
      plan_id,
    });

    const { id: help_order_id } = await factory.create('HelpOrder', {
      student_id,
    });

    const { answer } = await factory.attrs('Answer', {
      replier_by: admin_id,
    });

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
