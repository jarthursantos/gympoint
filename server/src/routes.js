import { Router } from 'express';

import multer from 'multer';
import multerConfig from './config/multer';

import AnswerController from './app/controllers/AnswerController';
import CheckinController from './app/controllers/CheckinController';
import AvatarController from './app/controllers/AvatarController';
import HelpOrderController from './app/controllers/HelpOrderController';
import HelpOrderNotificationController from './app/controllers/HelpOrderNotificationController';
import PlanController from './app/controllers/PlanController';
import RegistrationController from './app/controllers/RegistrationController';
import SessionController from './app/controllers/SessionController';
import StudentAskController from './app/controllers/StudentAskController';
import StudentController from './app/controllers/StudentController';
import StudentNotificationController from './app/controllers/StudentNotificationController';
import UserController from './app/controllers/UserController';

import authMiddleware from './app/middlewares/auth';

import validateUserStore from './app/validators/UserStore';
import validateUserUpdate from './app/validators/UserUpdate';

import validateSessionStore from './app/validators/SessionStore';

import validateStudentStore from './app/validators/StudentStore';
import validateStudentUpdate from './app/validators/StudentUpdate';

import validateHelpOrderStore from './app/validators/HelpOrderStore';

import validateAnswerStore from './app/validators/AnswerStore';

import validatePlanStore from './app/validators/PlanStore';
import validatePlanUpdate from './app/validators/PlanUpdate';
import validatePlanExists from './app/validators/PlanExists';

import validateRegistrationStore from './app/validators/RegistrationStore';
import validateRegistrationUpdate from './app/validators/RegistrationUpdate';

const routes = new Router();
const upload = multer(multerConfig);

routes.use('/sessions', validateSessionStore, SessionController.store);

routes.get('/students/:id/checkins', CheckinController.index);
routes.post('/students/:id/checkins', CheckinController.store);

routes.get(
  '/students/:student_id/notifications',
  StudentNotificationController.index
);
routes.put(
  '/students/:student_id/notifications/:id',
  StudentNotificationController.update
);

routes.get('/students/:id/help-orders', StudentAskController.index);
routes.post(
  '/students/:id/help-orders',
  validateHelpOrderStore,
  StudentAskController.store
);

routes.use(authMiddleware);

routes.post('/users', validateUserStore, UserController.store);
routes.put('/users', validateUserUpdate, UserController.update);

routes.get('/help-orders', HelpOrderController.index);

routes.get('/notifications', HelpOrderNotificationController.index);
routes.put('/notifications/:id', HelpOrderNotificationController.update);

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
routes.put(
  '/plans/:id',
  validatePlanUpdate,
  validatePlanExists(req => req.params.id),
  PlanController.update
);
routes.delete(
  '/plans/:id',
  validatePlanExists(req => req.params.id),
  PlanController.destroy
);

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
