import { Model, DOUBLE, INTEGER, STRING } from 'sequelize';

// import shortid from 'shortid';
const shortid = require('shortid');

class Student extends Model {
  static init(sequelize) {
    super.init(
      {
        name: STRING,
        email: STRING,
        age: INTEGER,
        height: DOUBLE,
        weight: DOUBLE,
        alternative_id: STRING,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', student => {
      student.alternative_id = shortid.generate();
    });

    return this;
  }
}

export default Student;
