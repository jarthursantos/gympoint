import User from '../models/User';
import Avatar from '../models/Avatar';

class UserController {
  async store(req, res) {
    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'email already in use' });
    }

    const { avatar_id } = req.body;

    if (avatar_id) {
      const avatarExists = await Avatar.findByPk(avatar_id);

      if (!avatarExists) {
        return res.status(400).json({ error: "avatar don't exists" });
      }
    }

    const { id, name, email } = await User.create(req.body);

    return res.json({ id, name, email });
  }

  async update(req, res) {
    const { email, oldPassword, avatar_id } = req.body;

    const user = await User.findByPk(req.user_id);

    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res.status(400).json({ error: 'user already exists' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'password does not match' });
    }

    if (avatar_id) {
      const avatarExists = await Avatar.findByPk(avatar_id);

      if (!avatarExists) {
        return res.status(400).json({ error: "avatar don't exists" });
      }
    }

    const { id, name } = await user.update(req.body);

    return res.json({ id, name, email });
  }
}

export default new UserController();

// TODO: refact req.body use
