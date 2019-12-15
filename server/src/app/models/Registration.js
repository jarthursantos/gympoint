import { Model, DOUBLE, DATE, VIRTUAL } from 'sequelize';
import { isBefore } from 'date-fns';

class Registration extends Model {
  static init(sequelize) {
    super.init(
      {
        price: DOUBLE,
        start_date: DATE,
        end_date: DATE,
        active: {
          type: VIRTUAL,
          get() {
            return isBefore(new Date(), this.end_date);
          },
        },
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
