import { Model, DOUBLE, INTEGER, STRING } from 'sequelize';

class Plan extends Model {
  static init(sequelize) {
    super.init(
      {
        title: STRING,
        duration: INTEGER,
        price: DOUBLE,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Plan;
