import { Model, STRING, VIRTUAL, DATE } from 'sequelize';

const bcrypt = require('bcryptjs');
// import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: STRING,
        email: STRING,
        password: VIRTUAL,
        password_hash: STRING,
        created_at: DATE,
        updated_at: DATE,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async user => {
      user.password_hash = await bcrypt.hash(user.password, 8);
    });

    return this;
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
