import { Router } from 'express';
import multer from 'multer';

import AnswerController from './app/controllers/AnswerController';
import AnsweredNotificationController from './app/controllers/AnsweredNotificationController';
import AvatarController from './app/controllers/AvatarController';
import CheckinController from './app/controllers/CheckinController';
import HelpOrderController from './app/controllers/HelpOrderController';
import PlanController from './app/controllers/PlanController';
import RegistrationController from './app/controllers/RegistrationController';
import SessionController from './app/controllers/SessionController';
import StudentAskController from './app/controllers/StudentAskController';
import StudentController from './app/controllers/StudentController';
import UserController from './app/controllers/UserController';
import authMiddleware from './app/middlewares/auth';
import validateAnswerStore from './app/validators/AnswerStore';
import validateHelpOrderStore from './app/validators/HelpOrderStore';
import validatePlanStore from './app/validators/PlanStore';
import validatePlanUpdate from './app/validators/PlanUpdate';
import validateRegistrationStore from './app/validators/RegistrationStore';
import validateRegistrationUpdate from './app/validators/RegistrationUpdate';
import validateSessionStore from './app/validators/SessionStore';
import validateStudentStore from './app/validators/StudentStore';
import validateStudentUpdate from './app/validators/StudentUpdate';
import validateUserStore from './app/validators/UserStore';
import validateUserUpdate from './app/validators/UserUpdate';
import multerConfig from './config/multer';

const routes = new Router();
const upload = multer(multerConfig);

routes.use('/sessions', validateSessionStore, SessionController.store); // Done

routes.get('/students/:id/checkins', CheckinController.index); // Done
routes.post('/students/:id/checkins', CheckinController.store); // Done

routes.get(
  '/students/:student_id/notifications',
  AnsweredNotificationController.index
); // Pending
routes.put(
  '/students/:student_id/notifications/:id',
  AnsweredNotificationController.update
); // Pending

routes.get('/students/:id/help-orders', StudentAskController.index);
routes.post(
  '/students/:id/help-orders',
  validateHelpOrderStore,
  StudentAskController.store
); // Pending

routes.use(authMiddleware);

routes.post('/users', validateUserStore, UserController.store); // Done
routes.put('/users', validateUserUpdate, UserController.update); // Done

routes.get('/help-orders', HelpOrderController.index); // Done

// TODO: routes.get('/notifications', HelpOrderNotificationController.index); // Pending
// TODO: routes.put('/notifications/:id', HelpOrderNotificationController.update); // Pending

routes.get('/students/:id', StudentController.show); // Done
routes.get('/students', StudentController.index); // Done
routes.post('/students', validateStudentStore, StudentController.store); // Done
routes.put('/students/:id', validateStudentUpdate, StudentController.update); // Done

routes.post(
  '/help-orders/:id/answer',
  validateAnswerStore,
  AnswerController.store
); // Done

routes.get('/plans/:id', PlanController.show); // Done
routes.get('/plans', PlanController.index); // Done
routes.post('/plans', validatePlanStore, PlanController.store); // Done
routes.put('/plans/:id', validatePlanUpdate, PlanController.update); // Done
routes.delete('/plans/:id', PlanController.destroy); // Done

routes.get('/registrations/:id', RegistrationController.show); // Done
routes.get('/registrations', RegistrationController.index); // Done
routes.post(
  '/registrations',
  validateRegistrationStore,
  RegistrationController.store
); // Pending
routes.put(
  '/registrations/:id',
  validateRegistrationUpdate,
  RegistrationController.update
); // Pending
routes.delete('/registrations/:id', RegistrationController.destroy); // Done

routes.post('/avatars', upload.single('file'), AvatarController.store); // Pending

export default routes;
