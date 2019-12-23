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

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'created_by', as: 'creator' });
  }
}

export default Plan;
