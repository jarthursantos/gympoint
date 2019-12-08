import { Model, STRING, DATE } from 'sequelize';

class HelpOrder extends Model {
  static init(sequelize) {
    super.init(
      {
        question: STRING,
        answer: STRING,
        answer_at: DATE,
      },
      { sequelize }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Student, { foreignKey: 'student_id', as: 'student' });
  }
}

export default HelpOrder;
