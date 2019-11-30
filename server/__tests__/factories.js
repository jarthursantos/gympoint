import faker from 'faker';
import { factory } from 'factory-girl';

import User from '../src/app/models/User';
import Plan from '../src/app/models/Plan';
import Student from '../src/app/models/Student';

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

export default factory;
