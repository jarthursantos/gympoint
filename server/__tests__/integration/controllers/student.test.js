import request from 'supertest';

import app from '../../../src/app';
import factory from '../../factories';
import truncate from '../../util/truncate';
import generateToken from '../../util/authToken';

describe('Students', () => {
  beforeEach(async () => {
    await truncate();
  });

  afterAll(async done => {
    await truncate();
    done();
  });

  it('index: should be able to show a list of students', async () => {
    const { token } = await generateToken();

    const response = await request(app)
      .get(`/students`)
      .set('Authorization', token);

    expect(Array.isArray(response.body)).toBe(true);
  });

  it('index: should not be able to show a list of students without autentication', async () => {
    const response = await request(app).get(`/students`);

    expect(response.status).toBe(401);
  });

  it('store: should be able to register', async () => {
    const student = await factory.attrs('Student');

    const { token } = await generateToken();

    const response = await request(app)
      .post('/students')
      .set('Authorization', token)
      .send(student);

    expect(response.body).toHaveProperty('id');
  });

  it('store: should not be able to register without authenticate', async () => {
    const student = await factory.attrs('Student');

    const response = await request(app)
      .post('/students')
      .send(student);

    expect(response.status).toBe(401);
  });

  it('store: should not be able to register without name', async () => {
    const student = await factory.attrs('Student');
    delete student.name;

    const { token } = await generateToken();

    const response = await request(app)
      .post('/students')
      .set('Authorization', token)
      .send(student);

    expect(response.status).toBe(400);
  });

  it('store: should not be able to register without email', async () => {
    const student = await factory.attrs('Student');
    delete student.email;

    const { token } = await generateToken();

    const response = await request(app)
      .post('/students')
      .set('Authorization', token)
      .send(student);

    expect(response.status).toBe(400);
  });

  it('store: should not be able to register without birthdate', async () => {
    const student = await factory.attrs('Student');
    delete student.birthdate;

    const { token } = await generateToken();

    const response = await request(app)
      .post('/students')
      .set('Authorization', token)
      .send(student);

    expect(response.status).toBe(400);
  });

  it('store: should not be able to register with invalid birthdate', async () => {
    const student = await factory.attrs('Student', {
      birthdate: 'this is a invalid date',
    });

    const { token } = await generateToken();

    const response = await request(app)
      .post('/students')
      .set('Authorization', token)
      .send(student);

    expect(response.status).toBe(400);
  });

  it('store: should not be able to register without height', async () => {
    const student = await factory.attrs('Student');
    delete student.height;

    const { token } = await generateToken();

    const response = await request(app)
      .post('/students')
      .set('Authorization', token)
      .send(student);

    expect(response.status).toBe(400);
  });

  it('store: should not be able to register with invalid height', async () => {
    const student = await factory.attrs('Student', {
      height: 0,
    });

    const { token } = await generateToken();

    const response = await request(app)
      .post('/students')
      .set('Authorization', token)
      .send(student);

    expect(response.status).toBe(400);
  });

  it('store: should not be able to register without weight', async () => {
    const student = await factory.attrs('Student');
    delete student.weight;

    const { token } = await generateToken();

    const response = await request(app)
      .post('/students')
      .set('Authorization', token)
      .send(student);

    expect(response.status).toBe(400);
  });

  it('store: should not be able to register with invalid weight', async () => {
    const student = await factory.attrs('Student', {
      weight: 0,
    });

    const { token } = await generateToken();

    const response = await request(app)
      .post('/students')
      .set('Authorization', token)
      .send(student);

    expect(response.status).toBe(400);
  });

  it('store: should not be able to register with duplicated email', async () => {
    const student = await factory.attrs('Student');

    const { token } = await generateToken();

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

  it('update: should be able to update', async () => {
    const student = await factory.attrs('Student');

    const { token } = await generateToken();

    const studentResponse = await request(app)
      .post('/students')
      .set('Authorization', token)
      .send(student);

    const { id } = studentResponse.body;

    const response = await request(app)
      .put(`/students/${id}`)
      .set('Authorization', token)
      .send({
        name: 'Silva José',
      });

    expect(response.body).toHaveProperty('id');
  });

  it('update: should not be able to update without authenticate', async () => {
    const student = await factory.attrs('Student');

    const { token } = await generateToken();

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

  it('update: should not be able to update invalid student', async () => {
    const { token } = await generateToken();

    const response = await request(app)
      .put(`/students/0`)
      .set('Authorization', token)
      .send({
        name: 'José Silva',
      });

    expect(response.status).toBe(400);
  });

  it('update: should be able to update student name', async () => {
    const student = await factory.attrs('Student');

    const { token } = await generateToken();

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

  it('update: should be able to update student email', async () => {
    const { id: admin_id, token } = await generateToken();

    const { id } = await factory.create('Student', {
      created_by: admin_id,
    });

    const response = await request(app)
      .put(`/students/${id}`)
      .set('Authorization', token)
      .send({
        email: 'silva@gmail.com',
      });

    expect(response.body).toHaveProperty('email');
    expect(response.body.email).toBe('silva@gmail.com');
  });

  it('update: should be able to update student birthdate', async () => {
    const { id: admin_id, token } = await generateToken();

    const { id } = await factory.create('Student', {
      created_by: admin_id,
    });

    const response = await request(app)
      .put(`/students/${id}`)
      .set('Authorization', token)
      .send({
        birthdate: '2000-01-01',
      });

    expect(response.body).toHaveProperty('birthdate');
  });

  it('update: should not be able to update student with invalid birthdate', async () => {
    const { id: admin_id, token } = await generateToken();

    const { id } = await factory.create('Student', {
      created_by: admin_id,
    });

    const response = await request(app)
      .put(`/students/${id}`)
      .set('Authorization', token)
      .send({
        birthdate: 'this is a invalid date',
      });

    expect(response.status).toBe(400);
  });

  it('update: should be able to update student height', async () => {
    const { id: admin_id, token } = await generateToken();

    const { id } = await factory.create('Student', {
      created_by: admin_id,
    });

    const response = await request(app)
      .put(`/students/${id}`)
      .set('Authorization', token)
      .send({
        height: 1.7,
      });

    expect(response.body).toHaveProperty('height');
    expect(response.body.height).toBe(1.7);
  });

  it('update: should not be able to update student with invalid height', async () => {
    const { id: admin_id, token } = await generateToken();

    const { id } = await factory.create('Student', {
      created_by: admin_id,
    });

    const response = await request(app)
      .put(`/students/${id}`)
      .set('Authorization', token)
      .send({
        height: 0,
      });

    expect(response.status).toBe(400);
  });

  it('update: should be able to update student weight', async () => {
    const { id: admin_id, token } = await generateToken();

    const { id } = await factory.create('Student', {
      created_by: admin_id,
    });

    const response = await request(app)
      .put(`/students/${id}`)
      .set('Authorization', token)
      .send({
        weight: 80.0,
      });

    expect(response.body).toHaveProperty('weight');
    expect(response.body.weight).toBe(80.0);
  });

  it('update: should not be able to update student with invalid weight', async () => {
    const { id: admin_id, token } = await generateToken();

    const { id } = await factory.create('Student', {
      created_by: admin_id,
    });

    const response = await request(app)
      .put(`/students/${id}`)
      .set('Authorization', token)
      .send({
        weight: 0,
      });

    expect(response.status).toBe(400);
  });

  it('update: should not be able to update student email with a already registered email', async () => {
    const student = await factory.attrs('Student');

    const { token } = await generateToken();

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
