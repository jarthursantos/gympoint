import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';

import authMiddleware from './app/middlewares/auth';

import validateUserStore from './app/validators/UserStore';

import validateSessionStore from './app/validators/SessionStore';

import validateStudentStore from './app/validators/StudentStore';
import validateStudentUpdate from './app/validators/StudentUpdate';

import validatePlanStore from './app/validators/PlanStore';
import validatePlanUpdate from './app/validators/PlanUpdate';

const routes = new Router();

routes.use('/sessions', validateSessionStore, SessionController.store);

routes.use(authMiddleware);

routes.post('/users', validateUserStore, UserController.store);

routes.post('/students', validateStudentStore, StudentController.store);
routes.put('/students/:id', validateStudentUpdate, StudentController.update);

routes.get('/plans', PlanController.index);
routes.post('/plans', validatePlanStore, PlanController.store);
routes.put('/plans/:id', validatePlanUpdate, PlanController.update);
routes.delete('/plans/:id', PlanController.destroy);

export default routes;
