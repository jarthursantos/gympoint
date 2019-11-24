import { Model, DOUBLE, INTEGER, STRING, DATE } from 'sequelize';

class Student extends Model {
  static init(sequelize) {
    super.init(
      {
        name: STRING,
        email: STRING,
        age: INTEGER,
        height: DOUBLE,
        weight: DOUBLE,
        created_at: DATE,
        updated_at: DATE,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Student;
