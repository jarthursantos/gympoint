import request from 'supertest';

import app from '../../../src/app';
import factory from '../../factories';
import truncate from '../../util/truncate';
import token from '../../util/authToken';

describe('Students/Index', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to show a list of students', async () => {
    const response = await request(app)
      .get(`/students`)
      .set('Authorization', token);

    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should not be able to show a list of students without autentication', async () => {
    const response = await request(app).get(`/students`);

    expect(response.status).toBe(401);
  });
});

describe('Students/Store', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to register', async () => {
    const student = await factory.attrs('Student');

    const response = await request(app)
      .post('/students')
      .set('Authorization', token)
      .send(student);

    expect(response.body).toHaveProperty('id');
  });

  it('should not be able to register without authenticate', async () => {
    const student = await factory.attrs('Student');

    const response = await request(app)
      .post('/students')
      .send(student);

    expect(response.status).toBe(401);
  });

  it('should not be able to register without name', async () => {
    const student = await factory.attrs('Student');
    delete student.name;

    const response = await request(app)
      .post('/students')
      .set('Authorization', token)
      .send(student);

    expect(response.status).toBe(400);
  });

  it('should not be able to register without email', async () => {
    const student = await factory.attrs('Student');
    delete student.email;

    const response = await request(app)
      .post('/students')
      .set('Authorization', token)
      .send(student);

    expect(response.status).toBe(400);
  });

  it('should not be able to register without age', async () => {
    const student = await factory.attrs('Student');
    delete student.age;

    const response = await request(app)
      .post('/students')
      .set('Authorization', token)
      .send(student);

    expect(response.status).toBe(400);
  });

  it('should not be able to register with invalid age', async () => {
    const student = await factory.attrs('Student', {
      age: 0,
    });

    const response = await request(app)
      .post('/students')
      .set('Authorization', token)
      .send(student);

    expect(response.status).toBe(400);
  });

  it('should not be able to register without height', async () => {
    const student = await factory.attrs('Student');
    delete student.height;

    const response = await request(app)
      .post('/students')
      .set('Authorization', token)
      .send(student);

    expect(response.status).toBe(400);
  });

  it('should not be able to register with invalid height', async () => {
    const student = await factory.attrs('Student', {
      height: 0,
    });

    const response = await request(app)
      .post('/students')
      .set('Authorization', token)
      .send(student);

    expect(response.status).toBe(400);
  });

  it('should not be able to register without weight', async () => {
    const student = await factory.attrs('Student');
    delete student.weight;

    const response = await request(app)
      .post('/students')
      .set('Authorization', token)
      .send(student);

    expect(response.status).toBe(400);
  });

  it('should not be able to register with invalid weight', async () => {
    const student = await factory.attrs('Student', {
      weight: 0,
    });

    const response = await request(app)
      .post('/students')
      .set('Authorization', token)
      .send(student);

    expect(response.status).toBe(400);
  });

  it('should not be able to register with duplicated email', async () => {
    const student = await factory.attrs('Student');

    await request(app)
      .post('/students')
      .set('Authorization', token)
      .send(student);

    const response = await request(app)
      .post('/students')
      .set('Authorization', token)
      .send(student);

    expect(response.status).toBe(400);
  });
});

describe('Students/Update', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to update', async () => {
    const student = await factory.attrs('Student');

    const planResponse = await request(app)
      .post('/students')
      .set('Authorization', token)
      .send(student);

    const { id } = planResponse.body;

    const response = await request(app)
      .put(`/students/${id}`)
      .set('Authorization', token)
      .send({
        name: 'Silva José',
      });

    expect(response.body).toHaveProperty('id');
  });

  it('should not be able to update without authenticate', async () => {
    const student = await factory.attrs('Student');

    const studentResponse = await request(app)
      .post('/students')
      .set('Authorization', token)
      .send(student);

    const { id } = studentResponse.body;

    const response = await request(app)
      .post(`/students/${id}`)
      .send({
        name: 'Silva José',
      });

    expect(response.status).toBe(401);
  });

  it('should not be able to update invalid student', async () => {
    const response = await request(app)
      .put(`/students/0`)
      .set('Authorization', token)
      .send({
        name: 'José Silva',
      });

    expect(response.status).toBe(400);
  });

  it('should be able to update student name', async () => {
    const student = await factory.attrs('Student');

    const studentResponse = await request(app)
      .post('/students')
      .set('Authorization', token)
      .send(student);

    const { id } = studentResponse.body;

    const response = await request(app)
      .put(`/students/${id}`)
      .set('Authorization', token)
      .send({
        name: 'José Silva',
      });

    expect(response.body).toHaveProperty('name');
    expect(response.body.name).toBe('José Silva');
  });

  it('should be able to update student email', async () => {
    const { id } = await factory.create('Student');

    const response = await request(app)
      .put(`/students/${id}`)
      .set('Authorization', token)
      .send({
        email: 'silva@gmail.com',
      });

    expect(response.body).toHaveProperty('email');
    expect(response.body.email).toBe('silva@gmail.com');
  });

  it('should be able to update student age', async () => {
    const { id } = await factory.create('Student');

    const response = await request(app)
      .put(`/students/${id}`)
      .set('Authorization', token)
      .send({
        age: 23,
      });

    expect(response.body).toHaveProperty('age');
    expect(response.body.age).toBe(23);
  });

  it('should not be able to update student with invalid age', async () => {
    const { id } = await factory.create('Student');

    const response = await request(app)
      .put(`/students/${id}`)
      .set('Authorization', token)
      .send({
        age: 0,
      });

    expect(response.status).toBe(400);
  });

  it('should be able to update student height', async () => {
    const { id } = await factory.create('Student');

    const response = await request(app)
      .put(`/students/${id}`)
      .set('Authorization', token)
      .send({
        height: 1.7,
      });

    expect(response.body).toHaveProperty('height');
    expect(response.body.height).toBe(1.7);
  });

  it('should not be able to update student with invalid height', async () => {
    const { id } = await factory.create('Student');

    const response = await request(app)
      .put(`/students/${id}`)
      .set('Authorization', token)
      .send({
        height: 0,
      });

    expect(response.status).toBe(400);
  });

  it('should be able to update student weight', async () => {
    const { id } = await factory.create('Student');

    const response = await request(app)
      .put(`/students/${id}`)
      .set('Authorization', token)
      .send({
        weight: 80.0,
      });

    expect(response.body).toHaveProperty('weight');
    expect(response.body.weight).toBe(80.0);
  });

  it('should not be able to update student with invalid weight', async () => {
    const { id } = await factory.create('Student');

    const response = await request(app)
      .put(`/students/${id}`)
      .set('Authorization', token)
      .send({
        weight: 0,
      });

    expect(response.status).toBe(400);
  });

  it('should not be able to update student email with a already registered email', async () => {
    const student = await factory.attrs('Student');

    await request(app)
      .post('/students')
      .set('Authorization', token)
      .send(student);

    const {
      body: { id },
    } = await request(app)
      .post('/students')
      .set('Authorization', token)
      .send({ ...student, email: `0${student.email}` });

    const response = await request(app)
      .put(`/students/${id}`)
      .set('Authorization', token)
      .send({ email: student.email });

    expect(response.status).toBe(400);
  });
});
