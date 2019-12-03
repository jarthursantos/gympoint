import request from 'supertest';
import { format } from 'date-fns';

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

  it('should not be able to register with a student that is already registered', async () => {
    const { id: student_id } = await factory.create('Student');
    const { id: plan_id } = await factory.create('Plan');

    const registration = await factory.attrs('Registration', {
      student_id,
      plan_id,
    });

    await request(app)
      .post('/registrations')
      .set('Authorization', token)
      .send(registration);

    const response = await request(app)
      .post('/registrations')
      .set('Authorization', token)
      .send(registration);

    expect(response.status).toBe(400);
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

  it('should not be able to register without start date', async () => {
    const { id: student_id } = await factory.create('Student');
    const { id: plan_id } = await factory.create('Plan');

    const registration = await factory.attrs('Registration', {
      student_id,
      plan_id,
    });

    delete registration.start_date;

    const response = await request(app)
      .post('/registrations')
      .set('Authorization', token)
      .send(registration);

    expect(response.status).toBe(400);
  });

  it('should not be able to register with invalid student', async () => {
    const { id: plan_id } = await factory.create('Plan');

    const registration = await factory.attrs('Registration', {
      plan_id,
    });

    const response = await request(app)
      .post('/registrations')
      .set('Authorization', token)
      .send(registration);

    expect(response.status).toBe(400);
  });

  it('should not be able to register with invalid plan', async () => {
    const { id: student_id } = await factory.create('Student');

    const registration = await factory.attrs('Registration', {
      student_id,
    });

    const response = await request(app)
      .post('/registrations')
      .set('Authorization', token)
      .send(registration);

    expect(response.status).toBe(400);
  });
});

describe('Registration/Update', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to update', async () => {
    const { id: student_id } = await factory.create('Student');
    const { id: plan_id } = await factory.create('Plan');

    const { id } = await factory.create('Registration', {
      student_id,
      plan_id,
    });

    const response = await request(app)
      .put(`/registrations/${id}`)
      .set('Authorization', token)
      .send({
        title: 'Gold',
      });

    expect(response.body).toHaveProperty('id');
  });

  it('should not be able to update without authenticate', async () => {
    const { id: student_id } = await factory.create('Student');
    const { id: plan_id } = await factory.create('Plan');

    const { id } = await factory.create('Registration', {
      student_id,
      plan_id,
    });

    const response = await request(app)
      .put(`/registrations/${id}`)
      .send({
        title: 'Gold',
      });

    expect(response.status).toBe(401);
  });

  it('should not be able to update invalid registration', async () => {
    const response = await request(app)
      .put(`/registrations/0`)
      .set('Authorization', token)
      .send({});

    expect(response.status).toBe(400);
  });

  it('should be able to update registration start date', async () => {
    const { id: student_id } = await factory.create('Student');
    const { id: plan_id } = await factory.create('Plan');

    const { id } = await factory.create('Registration', {
      student_id,
      plan_id,
    });

    const response = await request(app)
      .put(`/registrations/${id}`)
      .set('Authorization', token)
      .send({
        start_date: format(new Date(), 'yyyy-MM-dd'),
      });

    expect(response.status).toBe(200);
  });

  it('should not be able to update registration with invalid start date', async () => {
    const { id: student_id } = await factory.create('Student');
    const { id: plan_id } = await factory.create('Plan');

    const { id } = await factory.create('Registration', {
      student_id,
      plan_id,
    });

    const response = await request(app)
      .put(`/registrations/${id}`)
      .set('Authorization', token)
      .send({
        start_date: "this don' is a date",
      });

    expect(response.status).toBe(400);
  });

  it('should be able to update registration plan', async () => {
    const { id: student_id } = await factory.create('Student');
    const { id: plan_id, duration, price } = await factory.create('Plan', {
      title: 'Silver',
    });
    const {
      id: plan_id_to_update,
      duration: new_duration,
      price: new_price,
    } = await factory.create('Plan', {
      title: 'Gold',
      duration: duration * 2,
      price: price * 0.75,
    });

    const { id } = await factory.create('Registration', {
      student_id,
      plan_id,
    });

    const response = await request(app)
      .put(`/registrations/${id}`)
      .set('Authorization', token)
      .send({
        plan_id: plan_id_to_update,
      });

    const value = parseFloat((new_duration * new_price).toFixed(2));

    expect(response.body.price).toBe(value);
  });

  it('should not be able to update with invalid plan', async () => {
    const { id: student_id } = await factory.create('Student');
    const { id: plan_id } = await factory.create('Plan');

    const { id } = await factory.create('Registration', {
      student_id,
      plan_id,
    });

    await request(app)
      .delete(`/plans/${plan_id}`)
      .set('Authorization', token);

    const response = await request(app)
      .put(`/registrations/${id}`)
      .set('Authorization', token)
      .send({
        plan_id: 1,
      });

    expect(response.status).toBe(400);
  });
});

describe('Registration/Destroy', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to delete specific plan', async () => {
    const { id: student_id } = await factory.create('Student');
    const { id: plan_id } = await factory.create('Plan');

    const { id } = await factory.create('Registration', {
      student_id,
      plan_id,
    });

    const response = await request(app)
      .delete(`/registrations/${id}`)
      .set('Authorization', token);

    expect(response.status).toBe(200);
  });

  it('should not be able to delete a plan without authenticate', async () => {
    const { id: student_id } = await factory.create('Student');
    const { id: plan_id } = await factory.create('Plan');

    const { id } = await factory.create('Registration', {
      student_id,
      plan_id,
    });

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
