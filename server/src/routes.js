import { Router } from 'express';

import multer from 'multer';
import multerConfig from './config/multer';

import AnswerController from './app/controllers/AnswerController';
import CheckinController from './app/controllers/CheckinController';
import AvatarController from './app/controllers/AvatarController';
import HelpOrderController from './app/controllers/HelpOrderController';
import PlanController from './app/controllers/PlanController';
import RegistrationController from './app/controllers/RegistrationController';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import UserController from './app/controllers/UserController';

import authMiddleware from './app/middlewares/auth';

import validateUserStore from './app/validators/UserStore';

import validateSessionStore from './app/validators/SessionStore';

import validateStudentStore from './app/validators/StudentStore';
import validateStudentUpdate from './app/validators/StudentUpdate';

import validateHelpOrderStore from './app/validators/HelpOrderStore';

import validateAnswerStore from './app/validators/AnswerStore';

import validatePlanStore from './app/validators/PlanStore';
import validatePlanUpdate from './app/validators/PlanUpdate';

import validateRegistrationStore from './app/validators/RegistrationStore';
import validateRegistrationUpdate from './app/validators/RegistrationUpdate';

const routes = new Router();
const upload = multer(multerConfig);

routes.use('/sessions', validateSessionStore, SessionController.store);

routes.get('/students/:id/checkins', CheckinController.index);
routes.post('/students/:id/checkins', CheckinController.store);

routes.get('/students/:id/help-orders', HelpOrderController.index);
routes.post(
  '/students/:id/help-orders',
  validateHelpOrderStore,
  HelpOrderController.store
);

routes.use(authMiddleware);

routes.post('/users', validateUserStore, UserController.store);

routes.get('/students', StudentController.index);
routes.post('/students', validateStudentStore, StudentController.store);
routes.put('/students/:id', validateStudentUpdate, StudentController.update);

routes.post(
  '/help-orders/:id/answer',
  validateAnswerStore,
  AnswerController.store
);

routes.get('/plans', PlanController.index);
routes.post('/plans', validatePlanStore, PlanController.store);
routes.put('/plans/:id', validatePlanUpdate, PlanController.update);
routes.delete('/plans/:id', PlanController.destroy);

routes.get('/registrations', RegistrationController.index);
routes.post(
  '/registrations',
  validateRegistrationStore,
  RegistrationController.store
);
routes.put(
  '/registrations/:id',
  validateRegistrationUpdate,
  RegistrationController.update
);
routes.delete('/registrations/:id', RegistrationController.destroy);

routes.post('/avatars', upload.single('file'), AvatarController.store);

export default routes;
