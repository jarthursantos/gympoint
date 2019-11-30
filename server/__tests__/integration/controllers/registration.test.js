import request from 'supertest';

import app from '../../../src/app';
import factory from '../../factories';
import truncate from '../../util/truncate';
import token from '../../util/authToken';

describe('Registration/Index', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to show a list of registrations', async () => {
    const response = await request(app)
      .get(`/registrations`)
      .set('Authorization', token);

    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should not be able to show a list of registrations without autentication', async () => {
    const response = await request(app).get(`/registrations`);

    expect(response.status).toBe(401);
  });
});

describe('Registration/Store', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to register', async () => {
    const { id: student_id } = await factory.create('Student');
    const { id: plan_id } = await factory.create('Plan');

    const registration = await factory.attrs('Registration', {
      student_id,
      plan_id,
    });

    const response = await request(app)
      .post('/registrations')
      .set('Authorization', token)
      .send(registration);

    expect(response.body).toHaveProperty('id');
  });

  it('should not be able to register without authenticate', async () => {
    const { id: student_id } = await factory.create('Student');
    const { id: plan_id } = await factory.create('Plan');

    const registration = await factory.attrs('Registration', {
      student_id,
      plan_id,
    });

    const response = await request(app)
      .post('/registrations')
      .send(registration);

    expect(response.status).toBe(401);
  });

  it('should not be able to register without student', async () => {
    const { id: plan_id } = await factory.create('Plan');

    const registration = await factory.attrs('Registration', {
      plan_id,
    });

    delete registration.student_id;

    const response = await request(app)
      .post('/registrations')
      .set('Authorization', token)
      .send(registration);

    expect(response.status).toBe(400);
  });

  it('should not be able to register without plan', async () => {
    const { id: student_id } = await factory.create('Student');

    const registration = await factory.attrs('Registration', {
      student_id,
    });

    delete registration.student_id;

    const response = await request(app)
      .post('/registrations')
      .set('Authorization', token)
      .send(registration);

    expect(response.status).toBe(400);
  });
});

/*
describe('Registration/Update', () => {
  beforeEach(async () => {
    await truncate();
    await createAdminUser();
  });

  it('should be able to update', async () => {


    const planResponse = await request(app)
      .post('/registrations')
      .set('Authorization', token)
      .send(defaultPlanData);

    const { id } = planResponse.body;

    const response = await request(app)
      .put(`/registrations/${id}`)
      .set('Authorization', token)
      .send({
        title: 'Gold',
      });

    expect(response.body).toHaveProperty('id');
  });

  it('should not be able to update without authenticate', async () => {


    const planResponse = await request(app)
      .post('/registrations')
      .set('Authorization', token)
      .send(defaultPlanData);

    const { id } = planResponse.body;

    const response = await request(app)
      .post(`/registrations/${id}`)
      .send({
        title: 'Gold',
        duration: 3,
        price: 109,
      });

    expect(response.status).toBe(401);
  });

  it('should not be able to update invalid plan', async () => {


    const response = await request(app)
      .put(`/registrations/0`)
      .set('Authorization', token)
      .send({
        title: 'Gold',
      });

    expect(response.status).toBe(400);
  });

  it('should be able to update plan title', async () => {


    const planResponse = await request(app)
      .post('/registrations')
      .set('Authorization', token)
      .send(defaultPlanData);

    const { id } = planResponse.body;

    const response = await request(app)
      .put(`/registrations/${id}`)
      .set('Authorization', token)
      .send({
        title: 'Gold',
      });

    expect(response.body).toHaveProperty('title');
    expect(response.body.title).toBe('Gold');
  });

  it('should not be able to update plan title with a already registered title', async () => {


    const studentResponse = await request(app)
      .post('/registrations')
      .set('Authorization', token)
      .send(defaultPlanData);

    const { id } = studentResponse.body;

    const response = await request(app)
      .put(`/registrations/${id}`)
      .set('Authorization', token)
      .send({
        title: defaultPlanData.title,
      });

    expect(response.status).toBe(400);
  });

  it('should be able to update plan duration', async () => {


    const planResponse = await request(app)
      .post('/registrations')
      .set('Authorization', token)
      .send(defaultPlanData);

    const { id } = planResponse.body;

    const response = await request(app)
      .put(`/registrations/${id}`)
      .set('Authorization', token)
      .send({
        duration: 3,
      });

    expect(response.body).toHaveProperty('duration');
    expect(response.body.duration).toBe(3);
  });

  it('should not be able to update plan with invalid duration', async () => {


    const planResponse = await request(app)
      .post('/registrations')
      .set('Authorization', token)
      .send(defaultPlanData);

    const { id } = planResponse.body;

    const response = await request(app)
      .put(`/registrations/${id}`)
      .set('Authorization', token)
      .send({
        duration: 0,
      });

    expect(response.status).toBe(400);
  });

  it('should be able to update plan price', async () => {


    const planResponse = await request(app)
      .post('/registrations')
      .set('Authorization', token)
      .send(defaultPlanData);

    const { id } = planResponse.body;

    const response = await request(app)
      .put(`/registrations/${id}`)
      .set('Authorization', token)
      .send({
        price: 109.0,
      });

    expect(response.body).toHaveProperty('price');
    expect(response.body.price).toBe(109.0);
  });

  it('should not be able to update plan with invalid price', async () => {


    const planResponse = await request(app)
      .post('/registrations')
      .set('Authorization', token)
      .send(defaultPlanData);

    const { id } = planResponse.body;

    const response = await request(app)
      .put(`/registrations/${id}`)
      .set('Authorization', token)
      .send({
        price: 0.0,
      });

    expect(response.status).toBe(400);
  });
});

describe('Registration/Destroy', () => {
  beforeEach(async () => {
    await truncate();
    await createAdminUser();
  });

  it('should be able to delete specific plan', async () => {


    const planResponse = await request(app)
      .post('/registrations')
      .set('Authorization', token)
      .send(defaultPlanData);

    const { id } = planResponse.body;

    const response = await request(app)
      .delete(`/registrations/${id}`)
      .set('Authorization', token);

    expect(response.status).toBe(200);
  });

  it('should not be able to delete a plan without authenticate', async () => {


    const planResponse = await request(app)
      .post('/registrations')
      .set('Authorization', token)
      .send(defaultPlanData);

    const { id } = planResponse.body;

    const response = await request(app).delete(`/registrations/${id}`);

    expect(response.status).toBe(401);
  });

  it('should not be able to delete a invalid plan', async () => {


    const response = await request(app)
      .delete('/registrations/0')
      .set('Authorization', token);

    expect(response.status).toBe(400);
  });
});
*/
