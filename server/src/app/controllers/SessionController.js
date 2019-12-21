import jwt from 'jsonwebtoken';
import User from '../models/User';
import Avatar from '../models/Avatar';

import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
      include: [
        {
          model: Avatar,
          as: 'avatar',
          attributes: ['id', 'name', 'path', 'url'],
        },
      ],
    });

    if (!user) {
      return res.status(400).json({ error: 'user not found' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(400).json({ error: 'invalid password' });
    }

    const { id, name, avatar } = user;

    return res.json({
      user: {
        id,
        name,
        email,
        avatar,
      },
      token: jwt.sign({ id }, authConfig.secret),
    });
  }
}

export default new SessionController();
