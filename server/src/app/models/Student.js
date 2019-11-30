import { Model, DOUBLE, INTEGER, STRING } from 'sequelize';

class Student extends Model {
  static init(sequelize) {
    super.init(
      {
        name: STRING,
        email: STRING,
        age: INTEGER,
        height: DOUBLE,
        weight: DOUBLE,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Student;
