import jwt from 'jsonwebtoken';
import authConfig from '../../src/config/auth';

export default `Bearer ${jwt.sign({ id: 1 }, authConfig.secret)}`;
