import User from '../models/User';
import Avatar from '../models/Avatar';

class UserController {
  async store(req, res) {
    const { email, name, avatar_id, password } = req.body;

    const userExists = await User.findOne({ where: { email } });

    if (userExists) {
      return res.status(400).json({ error: 'email already in use' });
    }

    if (avatar_id) {
      const avatarExists = await Avatar.findByPk(avatar_id);

      if (!avatarExists) {
        return res.status(400).json({ error: "avatar don't exists" });
      }
    }

    const user = await User.create({ name, email, password, avatar_id });

    return res.json(user);
  }

  async update(req, res) {
    const { name, email, old_password, password, avatar_id } = req.body;

    const user = await User.findByPk(req.user_id);

    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res.status(400).json({ error: 'user already exists' });
      }
    }

    if (old_password && !(await user.checkPassword(old_password))) {
      return res.status(401).json({ error: 'old password does not match' });
    }

    if (avatar_id) {
      const avatarExists = await Avatar.findByPk(avatar_id);

      if (!avatarExists) {
        return res.status(400).json({ error: "avatar don't exists" });
      }
    }

    await user.update({
      name,
      email,
      avatar_id,
      password,
    });

    const updatedUser = await User.update(req.user_id, {
      include: [
        {
          model: Avatar,
          as: 'avatar',
          attributes: ['id', 'name', 'path', 'url'],
        },
      ],
      attributes: ['id', 'name', 'email'],
    });

    return res.json(updatedUser);
  }
}

export default new UserController();
