import request from 'supertest';

import app from '../../../src/app';
import factory from '../../factories';
import truncate from '../../util/truncate';
import generateToken from '../../util/authToken';

describe('HelpOrder', () => {
  beforeEach(async () => {
    await truncate();
  });

  afterAll(async done => {
    await truncate();
    done();
  });

  it('index: should be able to show a list of help orders from student', async () => {
    const { id: admin_id } = await generateToken();

    const { id: student_id } = await factory.create('Student', {
      created_by: admin_id,
    });

    await factory.create('HelpOrder', {
      student_id,
    });

    const response = await request(app).get(
      `/students/${student_id}/help-orders`
    );

    expect(Array.isArray(response.body)).toBe(true);
  });

  it('index: should not be able to show a list of help orders from a invalid student', async () => {
    const response = await request(app).get(`/students/0/help-orders`);

    expect(response.status).toBe(400);
  });

  it('store: should be able to store', async () => {
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

    const { question } = await factory.attrs('HelpOrder');

    const response = await request(app)
      .post(`/students/${student_id}/help-orders`)
      .send({
        question,
      });

    expect(response.body).toHaveProperty('id');
  });

  it('store: should not be able to store with invalid student', async () => {
    const { question } = await factory.attrs('HelpOrder');

    const response = await request(app)
      .post(`/students/0/help-orders`)
      .send({
        question,
      });

    expect(response.status).toBe(400);
  });

  it('store: should not be able to store without question', async () => {
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

    const response = await request(app)
      .post(`/students/${student_id}/help-orders`)
      .send({});

    expect(response.status).toBe(400);
  });

  it("should not be able to store with don't registered student", async () => {
    const { id: admin_id } = await generateToken();

    const { id: student_id } = await factory.create('Student', {
      created_by: admin_id,
    });
    const { question } = await factory.attrs('HelpOrder');

    const response = await request(app)
      .post(`/students/${student_id}/help-orders`)
      .send({
        question,
      });

    expect(response.status).toBe(400);
  });
});
