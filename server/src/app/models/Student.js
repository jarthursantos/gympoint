import { Model, DOUBLE, DATE, STRING } from 'sequelize';

import shortid from 'shortid';

class Student extends Model {
  static init(sequelize) {
    super.init(
      {
        name: STRING,
        email: STRING,
        birthdate: DATE,
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
