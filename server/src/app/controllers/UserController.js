import User from '../models/User';

class UserController {
  async store(req, res) {
    const { email } = req.body;

    const userExists = await User.findOne({ where: { email } });

    if (userExists) {
      return res.status(400).json({ error: 'email already in use' });
    }

    const user = await User.create(req.body);

    return res.json(user);
  }
}

export default new UserController();
