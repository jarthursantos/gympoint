import jwt from 'jsonwebtoken';
import authConfig from '../../src/config/auth';

import factory from '../factories';

export default async function generateToken() {
  const { id } = await factory.create('User', {
    email: 'admin@gympoint.com',
  });

  return { id, token: `Bearer ${jwt.sign({ id }, authConfig.secret)}` };
}
