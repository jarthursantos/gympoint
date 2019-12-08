import faker from 'faker';
import { factory } from 'factory-girl';

import User from '../src/app/models/User';
import Plan from '../src/app/models/Plan';
import Checkin from '../src/app/models/Checkin';
import HelpOrder from '../src/app/models/HelpOrder';
import Student from '../src/app/models/Student';
import Registration from '../src/app/models/Registration';

factory.define('User', User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

factory.define('Student', Student, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  age: faker.random.number(),
  height: faker.random.number({ precision: 0.1 }),
  weight: faker.random.number({ precision: 0.1 }),
});

factory.define('Plan', Plan, {
  title: faker.name.findName(),
  duration: faker.random.number(),
  price: faker.random.number({ precision: 0.1 }),
});

factory.define('Registration', Registration, {
  student_id: faker.random.number(),
  plan_id: faker.random.number(),
  start_date: faker.date.future(),
  end_date: faker.date.future(),
  price: faker.random.number({ precision: 0.1 }),
});

factory.define('Checkin', Checkin, {
  student_id: faker.random.number(),
});

factory.define('HelpOrder', HelpOrder, {
  student_id: faker.random.number(),
  question: faker.lorem.paragraph(1),
});

factory.define('Answer', HelpOrder, {
  answer: faker.lorem.paragraph(1),
});

export default factory;
