import request from 'supertest';

import { subYears } from 'date-fns';

import app from '../../../src/app';
import factory from '../../factories';
import truncate from '../../util/truncate';

describe('Checkin/Index', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to show a list of checkins from student', async () => {
    const { id: student_id } = await factory.create('Student');
    const { id: plan_id } = await factory.create('Plan');

    await factory.create('Registration', {
      student_id,
      plan_id,
    });

    const response = await request(app).get(`/students/${student_id}/checkins`);

    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should not be able to show a list of checkins from a invalid student', async () => {
    const response = await request(app).get(`/students/0/checkins`);

    expect(response.status).toBe(400);
  });
});

describe('Checkin/Store', () => {
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

    const response = await request(app).post(
      `/students/${student_id}/checkins`
    );

    expect(response.body).toHaveProperty('id');
  });

  it('should not be able to store with invalid student', async () => {
    const response = await request(app).post('/students/0/checkins');

    expect(response.status).toBe(400);
  });

  it("should not be able to store with don't registered student", async () => {
    const { id: student_id } = await factory.create('Student');

    const response = await request(app).post(
      `/students/${student_id}/checkins`
    );

    expect(response.status).toBe(400);
  });

  it('should not be able to store with expired register', async () => {
    const { id: student_id } = await factory.create('Student');
    const { id: plan_id } = await factory.create('Plan', {
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

  it('should not be able to store with student quota exceded', async () => {
    const { id: student_id } = await factory.create('Student');
    const { id: plan_id } = await factory.create('Plan', {
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
