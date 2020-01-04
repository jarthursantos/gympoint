import Queue from '../../lib/Queue';
import HelpOrderAnsweredJob from '../jobs/HelpOrderAnsweredMail';
import Avatar from '../models/Avatar';
import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';
import User from '../models/User';

class AnswerController {
  async store(req, res) {
    const { id: help_order_id } = req.params;
    const { answer } = req.body;

    const help_order = await HelpOrder.findByPk(help_order_id);

    if (!help_order) {
      return res.status(400).json({ error: "help order don't exists" });
    }

    const { answer_at: alreadAnswed } = help_order;

    if (alreadAnswed) {
      return res.status(400).json({ error: 'help order already answered' });
    }

    await help_order.update({
      answer,
      answer_at: new Date(),
      replier_by: req.user_id,
    });

    const updated = await HelpOrder.findByPk(help_order_id, {
      include: [
        {
          model: User,
          as: 'replier',
          include: [
            {
              model: Avatar,
              as: 'avatar',
              attributes: ['id', 'name', 'path', 'url'],
            },
          ],
          attributes: ['name'],
        },
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email', 'alternative_id'],
        },
      ],
      attributes: ['id', 'question', 'answer', 'answer_at', 'created_at'],
    });

    await Queue.add(HelpOrderAnsweredJob.key, { help_order: updated });

    return res.json(updated);
  }
}

export default new AnswerController();

// TODO: student avaliate a answer
