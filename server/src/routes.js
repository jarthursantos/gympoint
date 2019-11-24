import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';

import validateUserStore from './app/validators/UserStore';
import validateSessionStore from './app/validators/SessionStore';

const routes = new Router();

routes.use('/sessions', validateSessionStore, SessionController.store);

routes.use(authMiddleware);

routes.post('/users', validateUserStore, UserController.store);

export default routes;
