import request from 'supertest';

import { subYears } from 'date-fns';

import app from '../../../src/app';
import factory from '../../factories';
import truncate from '../../util/truncate';
import generateToken from '../../util/authToken';

describe('Checkin', () => {
  beforeEach(async () => {
    await truncate();
  });

  afterAll(async done => {
    await truncate();
    done();
  });

  it('index: should be able to show a list of checkins from student', async () => {
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

    const response = await request(app).get(`/students/${student_id}/checkins`);

    expect(Array.isArray(response.body)).toBe(true);
  });

  it('index: should not be able to show a list of checkins from a invalid student', async () => {
    const response = await request(app).get(`/students/0/checkins`);

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

    const response = await request(app).post(
      `/students/${student_id}/checkins`
    );

    expect(response.body).toHaveProperty('id');
  });

  it('store: should not be able to store with invalid student', async () => {
    const response = await request(app).post('/students/0/checkins');

    expect(response.status).toBe(400);
  });

  it("should not be able to store with don't registered student", async () => {
    const { id: admin_id } = await generateToken();

    const { id: student_id } = await factory.create('Student', {
      created_by: admin_id,
    });

    const response = await request(app).post(
      `/students/${student_id}/checkins`
    );

    expect(response.status).toBe(400);
  });

  it('store: should not be able to store with expired register', async () => {
    const { id: admin_id } = await generateToken();

    const { id: student_id } = await factory.create('Student', {
      created_by: admin_id,
    });
    const { id: plan_id } = await factory.create('Plan', {
      created_by: admin_id,
      duration: 1,
    });

    await factory.create('Registration', {
      student_id,
      plan_id,
      start_date: subYears(new Date(), 1),
      end_date: subYears(new Date(), 1),
    });

    const response = await request(app).post(
      `/students/${student_id}/checkins`
    );

    expect(response.status).toBe(400);
  });

  it('store: should not be able to store with student quota exceded', async () => {
    const { id: admin_id } = await generateToken();

    const { id: student_id } = await factory.create('Student', {
      created_by: admin_id,
    });
    const { id: plan_id } = await factory.create('Plan', {
      created_by: admin_id,
      duration: 12,
    });

    await factory.create('Registration', {
      student_id,
      plan_id,
    });

    await factory.create('Checkin', { student_id });
    await factory.create('Checkin', { student_id });
    await factory.create('Checkin', { student_id });
    await factory.create('Checkin', { student_id });
    await factory.create('Checkin', { student_id });

    const response = await request(app).post(
      `/students/${student_id}/checkins`
    );

    expect(response.status).toBe(400);
  });
});
