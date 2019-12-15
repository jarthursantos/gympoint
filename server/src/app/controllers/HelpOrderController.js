import User from '../models/User';
import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

class HelpOrderController {
  async index(req, res) {
    const helpOrders = await HelpOrder.findAll({
      where: {
        answer_at: null,
      },
      include: [
        {
          model: User,
          as: 'replier',
          attributes: ['name'],
        },
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email', 'alternative_id'],
        },
      ],
      attributes: ['id', 'question', 'created_at'],
    });

    return res.json(helpOrders);
  }
}

export default new HelpOrderController();
