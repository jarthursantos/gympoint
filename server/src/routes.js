import { Router } from 'express';

import UserController from './app/controllers/UserController';
import StudentController from './app/controllers/StudentController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';

import validateUserStore from './app/validators/UserStore';
import validateStudentStore from './app/validators/StudentStore';
import validateSessionStore from './app/validators/SessionStore';

const routes = new Router();

routes.use('/sessions', validateSessionStore, SessionController.store);

routes.use(authMiddleware);

routes.post('/users', validateUserStore, UserController.store);
routes.post('/students', validateStudentStore, StudentController.store);

export default routes;
