import { Model, DOUBLE, INTEGER, STRING, DATE, VIRTUAL } from 'sequelize';

class Plan extends Model {
  static init(sequelize) {
    super.init(
      {
        title: STRING,
        duration: INTEGER,
        price: DOUBLE,
        deprecated_at: DATE,
        deprecated: {
          type: VIRTUAL,
          get() {
            return !!this.deprecated_at;
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
    this.belongsTo(models.User, { foreignKey: 'created_by', as: 'creator' });
  }
}

export default Plan;
