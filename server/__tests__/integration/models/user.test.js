import '../../../src/app';

import bcrypt from 'bcryptjs';

import factory from '../../factories';

describe('Users', () => {
  it('should encrypt user password when new user created', async () => {
    const user = await factory.create('User');

    const compareHash = await bcrypt.compare(user.password, user.password_hash);

    expect(compareHash).toBe(true);
  });
});
