import request from 'supertest';

import app from '../../../src/app';
import truncate from '../../util/truncate';
import createAdminUser from '../../util/createAdminUser';

describe('Session', () => {
  beforeEach(async () => {
    await truncate();
    await createAdminUser();
  });

  it('should be able to authenticate the credentials', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({
        email: 'admin@gympoint.com',
        password: 'password',
      });

    expect(response.body).toHaveProperty('token');
  });

  it('should not be able to authenticate credentials without email', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({
        password: 'password',
      });

    expect(response.status).toBe(400);
  });

  it('should not be able to authenticate credentials without password', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({
        email: 'arthur@gympoint.com',
      });

    expect(response.status).toBe(400);
  });

  it('should not be able to authenticate invalid credentials email', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({
        email: 'foo@bar.com',
        password: 'password',
      });

    expect(response.status).toBe(400);

    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('user not found');
  });

  it('should not be able to authenticate invalid credentials password', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({
        email: 'admin@gympoint.com',
        password: 'foobar',
      });

    expect(response.status).toBe(400);

    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('invalid password');
  });
});
