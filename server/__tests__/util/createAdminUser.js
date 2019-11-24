import User from '../../src/app/models/User';

export default function createAdminUser() {
  return Promise.all([
    User.create({
      name: 'Administrador',
      email: 'admin@gympoint.com',
      password: 'password',
    }),
  ]);
}
