import { Model, DOUBLE, INTEGER, STRING, DATE } from 'sequelize';

class Plan extends Model {
  static init(sequelize) {
    super.init(
      {
        title: STRING,
        duration: INTEGER,
        price: DOUBLE,
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

export default Plan;
