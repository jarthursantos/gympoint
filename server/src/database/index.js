import Sequelize from 'sequelize';
import mongoose from 'mongoose';

import Checkin from '../app/models/Checkin';
import Avatar from '../app/models/Avatar';
import HelpOrder from '../app/models/HelpOrder';
import User from '../app/models/User';
import Plan from '../app/models/Plan';
import Registration from '../app/models/Registration';
import Student from '../app/models/Student';

import databaseConfig from '../config/database';

const models = [User, Student, Plan, Registration, Checkin, HelpOrder, Avatar];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }

  mongo() {
    this.mongoConnection = mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
  }
}

export default new Database();
