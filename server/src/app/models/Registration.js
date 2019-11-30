import { Model, DOUBLE, DATE } from 'sequelize';

class Registration extends Model {
  static init(sequelize) {
    super.init(
      {
        price: DOUBLE,
        start_date: DATE,
        end_date: DATE,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Student, { foreignKey: 'student_id', as: 'student' });
    this.belongsTo(models.Plan, { foreignKey: 'plan_id', as: 'plan' });
  }
}

export default Registration;
