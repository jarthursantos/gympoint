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
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email', 'alternative_id'],
        },
      ],
      attributes: ['id', 'question', 'created_at'],
      order: ['created_at'],
    });

    return res.json(helpOrders);
  }
}

export default new HelpOrderController();
